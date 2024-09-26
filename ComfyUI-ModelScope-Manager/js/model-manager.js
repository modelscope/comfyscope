import { $el } from '../../scripts/ui.js'
import { manager_instance, rebootAPI, fetchData, md5, icons } from './common.js'

// https://cenfun.github.io/turbogrid/api.html
import TG from './turbogrid.esm.js'

const pageCss = `
.cmm-manager {
	--grid-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	z-index: 10001;
	width: 80%;
	height: 80%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: var(--fg-color);
	font-family: arial, sans-serif;
}

.cmm-manager .cmm-flex-auto {
	flex: auto;
}

.cmm-manager button {
	font-size: 16px;
	color: var(--input-text);
    background-color: var(--comfy-input-bg);
    border-radius: 8px;
    border-color: var(--border-color);
    border-style: solid;
    margin: 0;
	padding: 4px 8px;
	min-width: 100px;
}

.cmm-manager button:disabled,
.cmm-manager input:disabled,
.cmm-manager select:disabled {
	color: gray;
}

.cmm-manager button:disabled {
	background-color: var(--comfy-input-bg);
}

.cmm-manager-header {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
}

.cmm-manager-header label {
	display: flex;
	flex: 1;
	gap: 10px;
	align-items: center;
}

.cmm-manager-header label[required="true"] span::before {
	display: inline-block;
    margin-inline-end: 4px;
    color: #ff4d4f;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
}

.cmm-manager-model_id,
.cmm-manager-revision,
.cmm-manager-filename,
.cmm-manager-save_path {
	flex: 1;
	min-width: 100px;
	height: 28px;
	line-height: 28px;
}

.cmm-manager-keywords {
	height: 28px;
	line-height: 28px;
	padding: 0 5px 0 26px;
	background-size: 16px;
	background-position: 5px center;
	background-repeat: no-repeat;
	background-image: url("data:image/svg+xml;charset=utf8,${encodeURIComponent(
    icons.search.replace('currentColor', '#888')
  )}");
}
.cmm-manager-help a {
  font-size: 14px;
  color: skyblue;
	text-decoration: none;
}

.cmm-manager-grid {
	flex: auto;
	border: 1px solid var(--border-color);
	overflow: hidden;
}


.cmm-manager-message {
	
}

.cmm-manager-footer {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
}

.cmm-manager-grid .tg-turbogrid {
	font-family: var(--grid-font);
	font-size: 15px;
	background: var(--bg-color);
}

.cmm-manager-grid .cmm-node-name a {
	color: skyblue;
	text-decoration: none;
	word-break: break-word;
}

.cmm-manager-grid .cmm-node-desc a {
	color: #5555FF;
  font-weight: bold;
	text-decoration: none;
}

.cmm-manager-grid .tg-cell a:hover {
	text-decoration: underline;
}

.cmm-icon-passed {
	width: 20px;
	height: 20px;
	position: absolute;
	left: calc(50% - 10px);
	top: calc(50% - 10px);
}




.cmm-status-error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.cmm-status-error-container .cmm-icon-conflicts {
  	color: #ff4d4f;
	position: relative;
	width: 20px;
	height: 20px;
	margin-right: 4px;
}


.cmm-status-error-container button {
  	padding: 2px;
    font-size: 14px;
    min-width: 72px;
}

.cmm-manager .cmm-btn-enable {
	background-color: blue;
	color: white;
}

.cmm-manager .cmm-btn-disable {
	background-color: MediumSlateBlue;
	color: white;
}

.cmm-manager .cmm-btn-install {
	background-color: black;
	color: white;
}

.cmm-btn-download {
	width: 18px;
	height: 18px;
	position: absolute;
	left: calc(50% - 10px);
	top: calc(50% - 10px);
	cursor: pointer;
	opacity: 0.8;
	color: #fff;
}

.cmm-btn-download:hover {
	opacity: 1;
}

.cmm-manager-light .cmm-btn-download {
	color: #000;
}

@keyframes cmm-btn-loading-bg {
    0% {
        left: 0;
    }
    100% {
        left: -105px;
    }
}

.cmm-manager button.cmm-btn-loading {
    position: relative;
    overflow: hidden;
    border-color: rgb(0 119 207 / 80%);
	background-color: var(--comfy-input-bg);
}

.cmm-manager button.cmm-btn-loading::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 500px;
    height: 100%;
    background-image: repeating-linear-gradient(
        -45deg,
        rgb(0 119 207 / 30%),
        rgb(0 119 207 / 30%) 10px,
        transparent 10px,
        transparent 15px
    );
    animation: cmm-btn-loading-bg 2s linear infinite;
}

.cmm-manager-light .cmm-node-name a {
	color: blue;
}

.cmm-manager-light .cm-warn-note {
	background-color: #ccc !important;
}

.cmm-manager-light .cmm-btn-install {
	background-color: #333;
}

.cmm-progress-bar-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.cmm-progress-bar-container > span {
  font-size: 14px;
  color: var(--descrip-text);
}

.cmm-progress-bar {
	position: relative;
	display: inline-block;
	height: 8px;
	margin-right: 4px;
	border-radius: 4px;
	overflow: hidden;
	background-color: #888888; 
}
.cmm-progress-completed {
	background-color: #90EE90;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.cmm-tooltip {
  position: absolute;
  z-index: 1000;
  max-width: 300px;
  background-color: var(--comfy-input-bg);
  color: var(--input-text);
  padding: 6px 10px;
  border-radius: 4px;
  border-color: var(--border-color);
  border-style: solid;
  border-width: 2px;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  word-wrap: break-word;
}
.cmm-tooltip-message {
  position: relative;
  z-index: 2;
}
.cmm-tooltip-message::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: -10px;
  right: -10px;
  top: -6px;
  bottom: -6px;
  width: calc(100% + 20px);
  height: calc(100% + 12px);
  background-color: var(--comfy-input-bg);
}
.cmm-tooltip.cmm-tooltip-visible {
  opacity: 1;
  visibility: visible;
}
.cmm-tooltip::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 8px;
  height: 8px; 
  left: 50%;
  background-color: var(--comfy-input-bg);
  transform: translate(-50%, -6.6px) rotate(45deg);
  border-color: var(--border-color);
  border-style: solid;
  border-width: 2px;
}
`

const pageHtml = `
<div class="cmm-manager-header">
	<label required="true">
		<span>Model ID:</span>
		<input class="cmm-manager-model_id" />
	</label>
	<label>
		<span>Revision:</span>
		<input class="cmm-manager-revision" />
	</label>
	<label required="true">
		<span>Filename:</span>
		<input class="cmm-manager-filename" />
	</label>
	<label required="true">
		<span>Save Path:</span>
		<input class="cmm-manager-save_path" />
	</label>
	<button class="cmm-btn-install">Install</button>
</div>
<div class="cmm-manager-header">
	<input class="cmm-manager-keywords" type="search" placeholder="Search" />
	<div class="cmm-flex-auto"></div>
  <div class="cmm-manager-help"><a href="https://modelscope.cn/docs/工作流" target="_blank"><b>Documentation</b></a></div>
</div>
<div class="cmm-manager-grid"></div>
<div class="cmm-manager-message"></div>
<div class="cmm-manager-footer">
	<button class="cmm-manager-close">Close</button>
	<div class="cmm-flex-auto"></div>
</div>
<div class="cmm-tooltip"></div>
`

export class ModelManager {
  static instance = null

  constructor(app, manager_dialog) {
    this.app = app
    this.manager_dialog = manager_dialog
    this.id = 'cmm-manager'

    this.form_data = {
      model_id: '',
      revision: '',
      filename: '',
      save_path: ''
    }
    this.keywords = ''

    this.init()
  }

  init() {
    // 添加样式
    if (!document.querySelector(`style[context="${this.id}"]`)) {
      const $style = document.createElement('style')
      $style.setAttribute('context', this.id)
      $style.innerHTML = pageCss
      document.head.appendChild($style)
    }
    // 添加 modal
    this.element = $el('div', {
      parent: document.body,
      className: 'comfy-modal cmm-manager'
    })
    this.element.innerHTML = pageHtml
    this.bindEvents()
    this.initGrid()
  }

  bindEvents() {
    const eventsMap = {
      '.cmm-manager-model_id': {
        change: (e) => {
          this.form_data.model_id = e.target.value
        }
      },
      '.cmm-manager-revision': {
        change: (e) => {
          this.form_data.revision = e.target.value
        }
      },
      '.cmm-manager-filename': {
        change: (e) => {
          this.form_data.filename = e.target.value
        }
      },
      '.cmm-manager-save_path': {
        change: (e) => {
          this.form_data.save_path = e.target.value
        }
      },
      '.cmm-btn-install': {
        click: async (e) => {
          if (this.installing) {
            return
          }

          this.installing = true
          const res = await this.installModel(this.form_data, e.currentTarget)
          this.installing = false
          if (res) {
            this.setFormData()
            await this.loadData(true)
          }
        }
      },
      '.cmm-manager-keywords': {
        input: (e) => {
          const keywords = `${e.target.value}`.trim()
          if (keywords !== this.keywords) {
            this.keywords = keywords
            this.updateGrid()
          }
        },
        focus: (e) => e.target.select()
      },
      '.cmm-manager-close': {
        click: (e) => this.close()
      }
    }
    Object.keys(eventsMap).forEach((selector) => {
      const target = this.element.querySelector(selector)
      if (target) {
        const events = eventsMap[selector]
        if (events) {
          Object.keys(events).forEach((type) => {
            target.addEventListener(type, events[type])
          })
        }
      }
    })
  }

  // ===========================================================================================

  initGrid() {
    const container = this.element.querySelector('.cmm-manager-grid')
    const grid = new TG.Grid(container)
    this.grid = grid

    // 绑定事件监听
    grid.bind('onClick', async (e, d) => {
      const { rowItem } = d
      const target = d.e.target
      const mode = target.getAttribute('mode')
      if (mode === 'retry') {
        const res = await this.installModel(
          {
            model_id: rowItem.model_id,
            revision: rowItem.revision,
            filename: rowItem.filename,
            save_path: rowItem.save_path
          },
          target
        )
        if (res) {
          await this.loadData(true)
        }
      }
    })

    const isNodeTruncated = function (node) {
      if (!node) {
        return false
      }
      if (node.clientWidth < node.scrollWidth) {
        return true
      }
    }

    grid
      .bind('onMouseOver', (e, d) => {
        const { rowItem } = d
        const target = d.e.target
        const mode = target.getAttribute('mode')
        if (mode === 'model-error-message') {
          this.showTooltip(target, rowItem.message)
          return
        }

        const value = d.rowItem[d.columnItem.id]
        if (value) {
          if (isNodeTruncated(target)) {
            this.showTooltip(target, `${value}`)
          } else if (isNodeTruncated(d.e.relatedTarget)) {
            this.showTooltip(d.e.relatedTarget, `${value}`)
          }
          return
        }
      })
      .bind('onMouseOut', (e, d) => {
        this.hideTooltip()
      })

    grid.setOption({
      theme: 'dark',

      selectVisible: false,
      selectMultiple: true,
      selectAllVisible: true,

      textSelectable: true,
      scrollbarRound: true,

      frozenColumn: 1,
      rowNotFound: 'No Results',
      rowHeight: 40,
      bindWindowResize: true,
      bindContainerResize: true,

      cellResizeObserver: (rowItem, columnItem) => {
        const autoHeightColumns = ['name', 'description']
        return autoHeightColumns.includes(columnItem.id)
      },

      // updateGrid handler for filter and keywords
      rowFilter: (rowItem) => {
        const searchableColumns = [
          'model_id',
          'revision',
          'save_path',
          'filename'
        ]

        let shouldShown = grid.highlightKeywordsFilter(
          rowItem,
          searchableColumns,
          this.keywords
        )

        return shouldShown
      }
    })
  }

  renderGrid() {
    // update theme
    const colorPalette =
      this.app.ui.settings.settingsValues['Comfy.ColorPalette']
    Array.from(this.element.classList).forEach((cn) => {
      if (cn.startsWith('cmm-manager-')) {
        this.element.classList.remove(cn)
      }
    })
    this.element.classList.add(`cmm-manager-${colorPalette}`)

    const options = {
      theme: colorPalette === 'light' ? '' : 'dark'
    }

    const rows = this.modelList || []

    const columns = [
      {
        id: 'model_id',
        name: 'Model ID',
        minWidth: 100,
        width: 300,
        maxWidth: 500,
        classMap: 'cmm-node-name',
        formatter: function (id, rowItem, columnItem, cellNode) {
          return `<a href="https://modelscope.cn/models/${id}" target="_blank"><b>${id}</b></a>`
        }
      },
      {
        id: 'status',
        name: 'Status',
        width: 130,
        minWidth: 110,
        width: 200,
        maxWidth: 500,
        sortable: false,
        align: 'center',
        formatter: (status, rowItem, columnItem) => {
          switch (status) {
            case 0:
            case 1:
              return `<div class="cmm-progress-bar-container">
			<div class="cmm-progress-bar" style="width: 100%;">
				<div class="cmm-progress-completed" style="width: ${rowItem.progress}%;"></div>
			</div>
			<span>${rowItem.progress}%</span>
		  </div`
            case -1:
              return `<div class="cmm-status-error-container"> 
					<div class="cmm-icon-conflicts" mode="model-error-message">
						${icons.conflicts}
					</div>
					<button mode="retry">Retry</button>
				</div>`
            case 2:
              return `<div class="cmm-icon-passed">${icons.passed}</div>`
            default:
              return ''
          }
        }
      },
      {
        id: 'revision',
        name: 'Revision',
        width: 150,
        align: 'center'
      },

      {
        id: 'filename',
        name: 'Filename',
        width: 300
      },
      {
        id: 'save_path',
        name: 'Save Path',
        width: 300
      }
    ]

    this.grid.setData({
      options,
      rows,
      columns
    })

    this.grid.render()
  }

  updateGrid() {
    if (this.grid) {
      this.grid.update()
    }
  }

  // ===========================================================================================
  async getModelsList() {
    if (this.fetching) {
      return
    }
    this.fetching = true
    const res = await fetchData('/customnode/modelscope/status')
    this.fetching = false
    return res
  }

  async loadData(update, loop) {
    !loop && this.showLoading()
    const res = await this.getModelsList()
    if (!res) {
      !loop && this.hideLoading()
      return
    }
    if (res.error) {
      this.showError('Failed to get external model list.')
      !loop && this.hideLoading()
      return
    }
    const models = res.data
    this.modelList = models
    if (update) {
      this.grid.setRows(this.modelList)
      this.updateGrid()
    } else {
      this.renderGrid()
    }
    if (models.some((item) => item.status === 1 || item.status === 0)) {
      setTimeout(() => {
        this.loadData(update, true)
      }, 500)
    }
    !loop && this.hideLoading()
  }

  async installModel(data, btn) {
    const prop2Label = {
      model_id: 'Model ID',
      save_path: 'Save Path',
      filename: 'Filename'
    }
    for (const key in prop2Label) {
      if (!data[key]) {
        this.showError(`${prop2Label[key]} is required.`)
        return false
      }
    }

    btn.classList.add('cmm-btn-loading')
    this.showLoading()
    this.showError('')
    const res = await fetchData('/customnode/modelscope/install_model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.error) {
      this.showError(`Install failed: ${data.model_id} ${res.error.message}`)
    }
    this.hideLoading()
    btn.classList.remove('cmm-btn-loading')
    return true
  }

  // ===========================================================================================

  showTooltip(target, message) {
    if (!message) {
      this.hideTooltip()
      return
    }
    const containerRect = this.element.getBoundingClientRect()
    const tooltipElement = document.querySelector('.cmm-tooltip')
    tooltipElement.innerHTML = `<div class="cmm-tooltip-message">${message}</div>`
    // 计算工具提示的位置
    const targetRect = target.getBoundingClientRect()
    const tooltipHeight = tooltipElement.offsetHeight
    const tooltipWidth = tooltipElement.offsetWidth

    tooltipElement.style.top = `${
      targetRect.top - containerRect.top - tooltipHeight - 10
    }px` // 在目标元素上方
    tooltipElement.style.left = `${
      targetRect.left -
      containerRect.left +
      (targetRect.width - tooltipWidth) / 2
    }px` // 居中对齐
    tooltipElement.classList.add('cmm-tooltip-visible')
  }

  hideTooltip() {
    const tooltipElement = document.querySelector('.cmm-tooltip')
    tooltipElement.classList.remove('cmm-tooltip-visible')
  }

  showError(err) {
    this.showMessage(err, 'red')
  }

  showMessage(msg, color) {
    if (color) {
      msg = `<font color="${color}">${msg}</font>`
    }
    this.element.querySelector('.cmm-manager-message').innerHTML = msg
  }

  showLoading() {
    this.setDisabled(true)
    if (this.grid) {
      this.grid.showLoading()
      this.grid.showMask({
        opacity: 0.05
      })
    }
  }

  hideLoading() {
    this.setDisabled(false)
    if (this.grid) {
      this.grid.hideLoading()
      this.grid.hideMask()
    }
  }

  setDisabled(disabled) {
    const $close = this.element.querySelector('.cmm-manager-close')

    const list = [
      '.cmm-manager-header input,button',
      '.cmm-manager-header select',
      '.cmm-manager-footer button'
    ]
      .map((s) => {
        return Array.from(this.element.querySelectorAll(s))
      })
      .flat()
      .filter((it) => {
        return it !== $close
      })

    list.forEach(($elem) => {
      if (disabled) {
        $elem.setAttribute('disabled', 'disabled')
      } else {
        $elem.removeAttribute('disabled')
      }
    })

    Array.from(this.element.querySelectorAll('.cmm-btn-loading')).forEach(
      ($elem) => {
        $elem.classList.remove('cmm-btn-loading')
      }
    )
  }

  setKeywords(keywords = '') {
    this.keywords = keywords
    this.element.querySelector('.cmm-manager-keywords').value = keywords
  }

  setFormData(
    data = {
      model_id: '',
      revision: '',
      filename: '',
      save_path: ''
    }
  ) {
    this.form_data = data
    Object.keys(data).map((key) => {
      this.element.querySelector(`.cmm-manager-${key}`).value = data[key]
    })
  }

  show() {
    this.element.style.display = 'flex'
    this.setKeywords('')
    this.showMessage('')
    this.loadData()
  }

  close() {
    this.element.style.display = 'none'
  }
}
