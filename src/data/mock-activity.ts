import type { Activity } from '../types';
export const mockActivity: Activity[] = [
  { id:'1', kind:'added', text:'Implemented estimate status workflow', source:'git', included:true },
  { id:'2', kind:'modified', text:'Updated DTO mapping for API status changes', source:'git', included:true },
  { id:'3', kind:'added', text:'Added unit tests for status transitions', source:'test', included:true },
  { id:'4', kind:'conflict', text:'One status-transition test is still failing', source:'test', included:true },
  { id:'5', kind:'untracked', text:'Investigated renderer performance', source:'manual', included:false }
];
