# Moect website

Moect 的项目展示、交互演示与下载网站，由 MOFAN 维护。

[访问网站](https://mofan6.github.io/moect/) · [Moect 项目](https://github.com/mofan6/Moect) · [下载发行版](https://github.com/mofan6/Moect/releases/latest)

## 内容与交互

- 中文与英文切换，保存语言偏好。
- 会话搜索、会话切换、朋友圈与表情包演示。
- 使用虚构消息生成可离线阅读的独立 HTML 示例文件。
- 演示界面深浅色切换、八种主题色预览。
- Windows 安装版、便携版及 SHA-256 校验入口。
- 软件真实宣传截图、FAQ、源码与构建指南。
- 键盘操作、手机布局、减少动态效果与动画暂停。
- 实时 WebGL 流体云雾、错峰模糊入场、按视口暂停的四组功能演示时间线。
- 按钮原点的 1080ms 圆形主题揭示，支持每张功能卡片独立暂停。
- 首屏标题、下载按钮与试用入口居中对齐；随滚动收缩的毛玻璃顶栏、背景高斯模糊与应用预览透视上倾，返回顶部恢复。
- Moect 雾紫与暖杏色动态云雾，轻透的带高光玻璃顶栏。
- 底部散点随滚动聚成 Moect 对话气泡点阵，支持反向散开、缓慢立体浮动与局部指针扰动。离开视口停止绘制，全局暂停冻结画面，减少动态效果时保留静态构图。

产品功能和系统要求依据 Moect 1.2.5 的 README 与发行说明。网站演示中的账号、消息、风景和收藏内容均为虚构数据。

## 本地运行

这是由 HTML、CSS 和 JavaScript 组成的静态网站。

```sh
python -m http.server 8787
```

然后在浏览器打开 `http://localhost:8787/moect/`。根地址会自动跳转到 `/moect/`，并保留链接中的查询参数与页面锚点。

## 修改与部署

| 文件                   | 用途                                           |
| ---------------------- | ---------------------------------------------- |
| `index.html`           | 旧地址跳转入口                                 |
| `moect/index.html`     | 页面结构、中文文案、下载链接和元信息           |
| `moect/styles.css`     | 响应式布局、背景、组件与动效                   |
| `moect/app.js`         | 英文文案、演示数据、交互和偏好                 |
| `moect/visuals.js`     | 实时流体背景、滚动联动、视口播放管理与卡片暂停 |
| `moect/convergence.js` | 底部点阵标志、滚动聚合、视口播放与暂停管理     |
| `moect/assets/`        | Moect 图标、虚构插画和软件宣传截图             |

GitHub Pages 从 `main` 分支的根目录发布，推送后自动部署。`.nojekyll` 用于按静态文件提供网站。

发布新软件版本时，更新 `moect/index.html` 中的版本、下载链接和文件大小，同时更新 `moect/app.js` 的英文发行信息。用户文档与项目源码链接指向 Moect 仓库。

## 视觉与素材

页面布局、深色云雾背景、分体下载控件和功能演示节奏参考了 DeepSeek Harness。Moect 的网站代码与演示组件独立实现。[设计参考](https://www.deepseek.com/harness/)

底部点阵动画依据参考站 `CtaDigitileR3F` 的模块结构及其[公开移植实现](https://github.com/ProjectArkClub/ProjectArkClub.github.io/blob/a5cafb74297ef7da27aadc63a82d193d5ebfb13c/assets/js/cta-scene.js)研究滚动聚合方式，绘图代码独立实现，点阵轮廓取自 Moect 自有图标。本次参考站原始动态分块返回空响应，未能直接运行其原始 3D 动画。

Moect 图标、宣传截图与支持二维码来自 Moect 项目。山间日落插画沿用项目公开演示素材的绘制方式。西文字体自托管 DM Sans，中文使用系统字体。DM Sans 的 SIL Open Font License 随素材提供。[项目素材与致谢](https://github.com/mofan6/Moect#致谢) · [字体许可](moect/assets/DM-Sans-LICENSE.txt)

本次制作使用 Chrome DevTools 分析样式与布局，使用 Playwright 观察和验证交互，并使用 Screenshot-to-Code 的截图提示构建与本地桌面、手机渲染。Screenshot-to-Code 的模型生成需要另行配置服务商 API Key。

## 许可证

网站源码采用 GPL-3.0，详见 [LICENSE](LICENSE)。Moect 软件与相关依赖的原有版权和许可说明见其项目仓库。
