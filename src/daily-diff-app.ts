import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/activity-item'; import './components/standup-card';
import { mockActivity } from './data/mock-activity';
import { MockStandupAgent } from './services/standup-agent';
import type { Activity, Standup } from './types';

@customElement('daily-diff-app')
export class DailyDiffApp extends LitElement {
 @state() private activity: Activity[] = structuredClone(mockActivity); @state() private standup?: Standup; private agent=new MockStandupAgent();
 static styles=css`:host{display:block;min-height:100vh;background:#f8fafc;color:#101828;font-family:Inter,system-ui,sans-serif}.shell{max-width:1050px;margin:auto;padding:3rem 1.25rem}header{margin-bottom:2rem}h1{font-size:2.4rem;margin:0}.tagline{color:#475467;font-size:1.05rem}.grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}.panel{background:#fff;border:1px solid #d0d5dd;border-radius:14px;overflow:hidden}.panel h2{padding:1rem 1rem .4rem;margin:0}.panel p{padding:0 1rem;color:#667085}button{margin:1rem;border:0;border-radius:9px;padding:.75rem 1rem;background:#101828;color:white;font-weight:650;cursor:pointer}@media(max-width:760px){.grid{grid-template-columns:1fr}}`;
 render(){return html`<main class="shell" @activity-toggle=${this.onToggle}><header><h1>Daily Diff</h1><p class="tagline">Your code changed. Your standup should know why.</p></header><div class="grid"><section class="panel"><h2>Activity</h2><p>Human in the loop: choose what the agent may use.</p>${this.activity.map(a=>html`<activity-item .activity=${a}></activity-item>`)}<button @click=${this.generate}>Generate standup</button></section><standup-card .standup=${this.standup}></standup-card></div></main>`}
 private onToggle(e:CustomEvent<{id:string;included:boolean}>){this.activity=this.activity.map(a=>a.id===e.detail.id?{...a,included:e.detail.included}:a)}
 private async generate(){this.standup=await this.agent.generate(this.activity)}
}
