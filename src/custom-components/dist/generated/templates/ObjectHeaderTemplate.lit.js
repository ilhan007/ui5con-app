
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/dist/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap, unsafeHTML, setTags, setSuffix } from '@ui5/webcomponents-base/dist/renderer/LitRenderer.js';
const block0 = (context) => { return html`<div class="container"  @keydown=${context._onkeydown}><div class="${classMap(context.classes.viewport)}"><div class="pages" style="${styleMap(context.styles.pages)}"><div class="page main-page" style="${styleMap(context.styles.main)}">${ context.hasImage ? block1(context) : undefined }<div class="${classMap(context.classes.content)}"><div class="important-area"><!-- Heading & subheading --><div class="heading"><slot name="heading"></slot></div><div class="subheading"><slot name="subheading"></slot></div><!-- Tags list --><div class="tags">${ repeat(context.tags, (item, index) => item._id || index, (item, index) => block2(item, index, context)) }</div><!-- Body text line --><div class="bodyText"><slot name="bodyText"></slot></div><!-- Footnote line --><div class="footnote"><slot name="footnote"></slot></div></div>${ !context.needsNavigation ? block3(context) : undefined }<div class="status-area"><div class="status"><slot name="status"></slot></div><div class="statusDescription"><slot name="statusDescription"></slot></div></div></div></div><div class="page desc-page" style="${styleMap(context.styles.desc)}">${ context.needsNavigation ? block4(context) : undefined }</div></div></div>${ context.needsNavigation ? block5(context) : undefined }</div>`; };
const block1 = (context) => { return html`<div class="image"><slot name="image"></slot></div>`; };
const block2 = (item, index, context) => { return html`<span class="tag"><slot name="${ifDefined(item._individualSlot)}"></slot></span>`; };
const block3 = (context) => { return html`<div class="description-area"><slot></slot></div>`; };
const block4 = (context) => { return html`<slot></slot>`; };
const block5 = (context) => { return html`<div class="dots-line"><div class="dots" @click=${context.togglePage}><div class="${classMap(context.classes.firstDot)}"></div><div class="${classMap(context.classes.secondDot)}"></div></div></div>`; };


const main = (context, tags, suffix) => {
	setTags(tags);
	setSuffix(suffix);
	return block0(context);
};
 
export default main;