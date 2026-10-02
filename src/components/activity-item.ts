import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Activity } from '../types';

@customElement('activity-item')
export class ActivityItem extends LitElement {
  @property({attribute:false}) activity!: Activity;
  static styles = css`
    :host{display:block} label{display:flex;gap:.7rem;align-items:flex-start;padding:.7rem;border-bottom:1px solid #e5e7eb;cursor:pointer}
    .kind{font:600 .72rem ui-monospace,monospace;text-transform:uppercase;min-width:5.5rem}.added{color:#08783e}.modified{color:#805500}.conflict{color:#b42318}.staged{color:#175cd3}.untracked{color:#667085}
    small{display:block;color:#667085;margin-top:.15rem}
  `;
  render(){return html`<label><input type="checkbox" .checked=${this.activity.included} @change=${this.toggle}><span><span class="kind ${this.activity.kind}">${this.activity.kind}</span> ${this.activity.text}<small>${this.activity.source}</small></span></label>`}
  private toggle(e: Event){this.dispatchEvent(new CustomEvent('activity-toggle',{detail:{id:this.activity.id,included:(e.target as HTMLInputElement).checked},bubbles:true,composed:true}))}
}
