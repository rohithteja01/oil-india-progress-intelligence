import { activities, milestones } from '../data'
import type { Activity, Milestone } from '../data'

export type ImpactedActivity = { activity: Activity; sequence: number; received: number; propagated: number; impactedFinish: string; float: number }
export type ImpactedMilestone = { milestone: Milestone; impact: number; newForecast: string }
export type ImpactResult = { id: string; selected: Activity; delay: number; affectedActivities: ImpactedActivity[]; affectedMilestones: ImpactedMilestone[]; projectImpact: number; risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; critical: boolean; completedAt: string }

const addDays = (date: string, days: number) => { const parsed = new Date(date); parsed.setDate(parsed.getDate() + days); return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
const riskFor = (impact: number): ImpactResult['risk'] => impact >= 8 ? 'CRITICAL' : impact >= 4 ? 'HIGH' : impact >= 2 ? 'MEDIUM' : 'LOW'

export function runImpactSimulation(activityId: string, delay: number, source = activities): ImpactResult | null {
  const selected = source.find(activity => activity.id === activityId)
  if (!selected || delay <= 0) return null
  const affectedActivities: ImpactedActivity[] = [{ activity: selected, sequence: 1, received: delay, propagated: delay, impactedFinish: addDays(selected.plannedFinish || '10 Jun 2026', delay), float: selected.float || 0 }]
  const queue = [{ id: selected.id, propagated: delay }]
  const visited = new Set([selected.id])
  while (queue.length) {
    const current = queue.shift()!
    const parent = source.find(activity => activity.id === current.id)
    for (const successorId of parent?.successors || []) {
      if (visited.has(successorId)) continue
      visited.add(successorId)
      const successor = source.find(activity => activity.id === successorId)
      if (!successor) continue
      const received = current.propagated
      const propagated = Math.max(0, received - (successor.float || 0))
      affectedActivities.push({ activity: successor, sequence: affectedActivities.length + 1, received, propagated, impactedFinish: addDays(successor.plannedFinish || '10 Jun 2026', propagated), float: successor.float || 0 })
      queue.push({ id: successor.id, propagated })
    }
  }
  const affectedMilestones = milestones.filter(milestone => affectedActivities.some(item => item.activity.milestoneId === `MS-${milestone.name.replaceAll(' ', '').slice(0, 3).toUpperCase()}` || (milestone.name === 'Commissioning' && item.activity.milestoneId === 'MS-COM') || (milestone.name === 'Piping' && item.activity.milestoneId === 'MS-PIP'))).map(milestone => { const impact = Math.max(...affectedActivities.filter(item => item.activity.milestoneId?.includes(milestone.name === 'Piping' ? 'PIP' : milestone.name === 'Commissioning' ? 'COM' : 'NONE')).map(item => item.propagated), 0); return { milestone, impact, newForecast: addDays(milestone.forecast, impact) } })
  const terminalImpacts = affectedActivities.filter(item => !item.activity.successors?.some(successorId => visited.has(successorId))).map(item => item.propagated)
  const projectImpact = Math.max(...terminalImpacts, 0)
  return { id: `SIM-${Date.now()}`, selected, delay, affectedActivities, affectedMilestones, projectImpact, risk: riskFor(projectImpact), critical: affectedActivities.some(item => item.activity.critical), completedAt: new Date().toISOString() }
}
export function saveSimulation(result: ImpactResult) { const saved = loadSimulations(); localStorage.setItem('oil-impact-simulations', JSON.stringify([result, ...saved].slice(0, 20))) }
export function loadSimulations(): ImpactResult[] { try { return JSON.parse(localStorage.getItem('oil-impact-simulations') || '[]') as ImpactResult[] } catch { return [] } }
export function deleteSimulation(id: string) { localStorage.setItem('oil-impact-simulations', JSON.stringify(loadSimulations().filter(item => item.id !== id))) }
export function clearSimulations() { localStorage.removeItem('oil-impact-simulations') }
