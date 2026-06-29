# Experience Schema V1（草案）

## 目标
本文件用于定义新框架中 `experience` 的最小稳定结构。
它描述的是“系统内容如何被定义”，而不是“界面如何实现”。

---

## 1. 顶层结构
一个 `experience` 建议包含以下顶层字段：

```json
{
  "meta": {},
  "navigation": [],
  "pages": {},
  "fields": {},
  "outputs": {}
}
```

说明：
- `meta`：经验元信息
- `navigation`：左侧导航树
- `pages`：页面定义
- `fields`：字段定义
- `outputs`：输出定义

---

## 2. meta
用于定义经验体本身的基本信息。

示例：
```json
{
  "key": "industrial-network-demo",
  "title": "工业网络规划知识表达框架",
  "subtitle": "用于承载规划经验、流程步骤与输出配置的统一框架。",
  "version": "0.1.0"
}
```

建议字段：
- `key`
- `title`
- `subtitle`
- `version`
- `description`

---

## 3. navigation
用于定义左侧菜单树。

最小节点结构：
```json
{
  "key": "raw-information",
  "title": "资料采集",
  "children": []
}
```

约定：
- `navigation` 是树结构
- 每个节点必须有 `key` 和 `title`
- 叶子节点通常对应一个页面 key
- 非叶子节点可只作为目录分组

示例：
```json
[
  {
    "key": "raw-information",
    "title": "资料采集",
    "children": [
      { "key": "project-basic", "title": "项目基础" },
      { "key": "business-description", "title": "业务描述" }
    ]
  }
]
```

---

## 4. pages
用于定义每个页面是什么类型，以及页面包含什么。

最小结构：
```json
{
  "project-basic": {
    "title": "项目基础",
    "type": "standard-record",
    "fields": ["project.name", "project.customer"]
  }
}
```

当前建议支持的页面类型：
- `standard-record`
- `record-collection`
- `group`
- `output`
- `tool`

页面内部结构也建议由定义驱动，而不是写死在组件中。

建议字段：
- `layout`
- `sections`

说明：
- `standard-record`：单页字段编辑页
- `record-collection`：可录入多条记录的集合页
- `group`：目录页/分组页，本身不直接编辑数据
- `output`：输出展示页
- `tool`：工具页

示例：
```json
{
  "business-description": {
    "title": "业务描述",
    "type": "record-collection",
    "layout": "list-form",
    "sections": [
      { "key": "record-list", "kind": "record-list", "title": "已采集记录" },
      { "key": "record-editor", "kind": "record-editor", "title": "录入区" }
    ],
    "fields": ["business.name", "business.zone"]
  }
}
```

---

## 5. fields
用于定义字段元信息。

最小结构：
```json
{
  "project.name": {
    "label": "项目名称",
    "type": "text",
    "defaultValue": "工业网络规划项目"
  }
}
```

建议字段：
- `label`
- `type`
- `defaultValue`
- `options`
- `optionsSource`
- `visibleWhen`
- `required`
- `description`

当前建议支持的字段类型：
- `text`
- `textarea`
- `select`
- 后续可扩展 `number` / `checkbox` / `radio` / `table`

---

## 6. 字段依赖
### 6.1 显示依赖
用于控制字段是否显示。

示例：
```json
{
  "visibleWhen": {
    "field": "zone.strategy",
    "equals": "核心隔离"
  }
}
```

### 6.2 数据依赖
用于让某字段的选项来自其他字段或记录。

#### 来自普通字段
```json
{
  "optionsSource": {
    "type": "lines-from-field",
    "field": "input.assets"
  }
}
```

#### 来自记录页某列
```json
{
  "optionsSource": {
    "type": "record-field",
    "recordPage": "business-description",
    "field": "business.zone",
    "dedupe": true
  }
}
```

---

## 7. outputs
当前可以先保留为空对象，后续再逐步完善。

示例：
```json
{
  "report-summary": {
    "title": "设计摘要",
    "sourcePages": ["project-basic", "zone-planning"]
  }
}
```

---

## 8. 当前落地建议
当前阶段建议：
- 先允许 `experience` 使用 `.js`
- 当 schema 稳定后，再收敛为 `.json`
- 所有灵活内容优先进 `methodology`
- 所有通用逻辑优先进 `engine`
- 所有运行时数据优先进 `store`

---

## 9. 当前结论
这个项目未来最重要的可配置核心，就是 `experience`。
框架本身不应该因为不同经验体而大改，应该通过替换不同 `experience` 来切换系统内容。
