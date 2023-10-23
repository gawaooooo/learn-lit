import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

type Task = {
  id: Number;
  label: String;
  completed: Boolean;
};

@customElement('todo-list')
export class ToDoListElement extends LitElement {
  // クラスの内部プロパティ(属性として公開しないプロパティ)
  @state()
  private _tasks: Task[] = [];

  constructor() {
    super();
    this._tasks = [
      {id: 1, label: 'カプセル化と再利用性について学ぶ', completed: true},
      {id: 2, label: 'Web ComponentsのAPIを学ぶ', completed: true},
      {id: 3, label: 'Litの基本的なAPIを学ぶ', completed: true},
      {id: 4, label: 'Litの実践的な使い方を学ぶ', completed: false},
    ];
  }

  static override styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `;

  protected override render(): unknown {
    return html`
      <h1>ToDo List</h1>
      ${map(this._tasks, (task) => {
        return html`
          <li class=${task.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                ?checked=${task.completed}
                @click=${(event: Event) => this.setChecked(task, event)}
              />
              ${task.label}
            </label>
          </li>
        `;
      })}
    `;
  }

  setChecked(task: Task, event: Event) {
    const {target} = event;
    if (!(target instanceof HTMLInputElement)) {
      throw new TypeError('target が HTMLInputElement ではない');
    }
    // データ更新
    task.completed = target.checked;
    // DOMへの再描画を依頼
    this.requestUpdate();
  }
}
