import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Standup } from '../types';
@customElement('standup-card')
export class StandupCard extends LitElement {
 @property({attribute:false}) standup?: Standup;
 static styles=css`:host{display:block}.card{background:white;border:1px solid #d0d5dd;border-radius:14px;padding:1.2rem}h2{margin-top:0}h3{font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;color:#475467;margin:1.2rem 0 .4rem}ul{margin:.3rem 0;padding-left:1.3rem}li{margin:.35rem 0}`;
 render(){if(!this.standup)return html`<div class="card"><h2>Your standup will appear here</h2><p>Select the activity you want included, then generate a draft.</p></div>`; return html`<div class="card"><h2>Standup draft</h2>${this.section('Yesterday',this.standup.yesterday)}${this.section('Today',this.standup.today)}${this.section('Blockers',this.standup.blockers)}</div>`}
 private section(title:string,items:string[]){return html`<h3>${title}</h3>${items.length?html`<ul>${items.map(i=>html`<li contenteditable="true">${i}</li>`)}</ul>`:html`<p>None.</p>`}`}
}
