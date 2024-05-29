type Product = {
	key: number,
	perishable: boolean;
	vegs?: boolean;
	status: string;
	tags: Array<string>;
	name: string;
	price: string,
	location: string,
	img: string,
	orderDate: string,
};

type Filter = "all" | "noPerishable" | "perishable" | "alerts" | "vegs";

import { DOMAttributes } from "react";

type CustomElement<T> = Partial<T & CustomElementAttrs<T> & { children: any }>;
type CustomElementAttrs<T> = DOMAttributes<T> & { key: string | number, ref: React.RefObject<T>, class: string }

import type Dialog from "@ui5/webcomponents/dist/Dialog";
import type Bar from "@ui5/webcomponents/dist/Bar";
import type Form from "@ui5/webcomponents/dist/Form";
import type FormGroup from "@ui5/webcomponents/dist/FormGroup";
import type FormItem from "@ui5/webcomponents/dist/FormItem";
import type Input from "@ui5/webcomponents/dist/Input";
import type Text from "@ui5/webcomponents/dist/Text";
import type TextArea from "@ui5/webcomponents/dist/TextArea";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker";
import type DateTimePicker from "@ui5/webcomponents/dist/DateTimePicker";
import type Select from "@ui5/webcomponents/dist/Select";
import type Option from "@ui5/webcomponents/dist/Option";
import type RadioButton from "@ui5/webcomponents/dist/RadioButton";
import type Card from "@ui5/webcomponents/dist/Card";
import type CardHeader from "@ui5/webcomponents/dist/CardHeader";

import type Avatar from "@ui5/webcomponents/dist/Avatar.js";
import type AvatarGroup from "@ui5/webcomponents/dist/AvatarGroup.js";
import type Switch from "@ui5/webcomponents/dist/Switch.js";
import type Table from "@ui5/webcomponents-compat/dist/Table.js";
import type TableColumn from "@ui5/webcomponents-compat/dist/TableColumn.js";
import type TableRow from "@ui5/webcomponents-compat/dist/TableRow.js";
import type TableCell from "@ui5/webcomponents-compat/dist/TableCell.js";
import type Label from "@ui5/webcomponents/dist/Label.js";
import type Tag from "@ui5/webcomponents/dist/Tag.js";

import type Tab from "@ui5/webcomponents/dist/Tab";
import type TabContainer from "@ui5/webcomponents/dist/TabContainer";
import type TabSeparator from "@ui5/webcomponents/dist/TabSeparator";
import type Button from "@ui5/webcomponents/dist/Button";
import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton";
import type Popover from "@ui5/webcomponents/dist/Popover";
import type Title from "@ui5/webcomponents/dist/Title";
import type List from "@ui5/webcomponents/dist/List";
import type StandardListItem from "@ui5/webcomponents/dist/StandardListItem";
import type NotificationListItem from "@ui5/webcomponents-fiori/dist/NotificationListItem";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import type DynamicPage from "@ui5/webcomponents-fiori/dist/DynamicPage";
import type DynamicPageTitle from "@ui5/webcomponents-fiori/dist/DynamicPageTitle";
import type DynamicPageHeader from "@ui5/webcomponents-fiori/dist/DynamicPageHeader";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import type Icon from "@ui5/webcomponents/dist/Icon";

import type Timeline from "@ui5/webcomponents-fiori/dist/Timeline";
import type TimelineItem from "@ui5/webcomponents-fiori/dist/TimelineItem";
import type Toolbar from "@ui5/webcomponents/dist/Toolbar";
import type ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton";

// import type Token from "@ui5con/components/dist/Token.js";
// import type Tokenizer from "@ui5con/components/dist/Tokenizer.js";

declare global {
	namespace JSX {
	  interface IntrinsicElements {
		// ['my-token']: CustomElement<Token>;
		// ['my-tokenizer']: CustomElement<Tokenizer>;
		['ui5-bar']: CustomElement<Bar>;
		['ui5-card']: CustomElement<Card>;
		['ui5-card-header']: CustomElement<CardHeader>;
		['ui5-tab']: CustomElement<Tab>;
		['ui5-tabcontainer']: CustomElement<TabContainer>;
		['ui5-tab-separator']: CustomElement<TabSeparator>;
		['ui5-button']: CustomElement<Button>;
		['ui5-form']: CustomElement<Form>;
		['ui5-form-group']: CustomElement<FormGroup>;
		['ui5-form-item']: CustomElement<FormItem>;
		['ui5-toggle-button']: CustomElement<ToggleButton>;
		['ui5-title']: CustomElement<Title>;
		['ui5-table']: CustomElement<Table>;
		['ui5-table-row']: CustomElement<TableRow>;
		['ui5-table-cell']: CustomElement<TableCell>;
		['ui5-table-column']: CustomElement<TableColumn>;
		['ui5-label']: CustomElement<Label>;
		['ui5-tag']: CustomElement<Tag>;
		['ui5-dialog']: CustomElement<Dialog>;
		['ui5-list']: CustomElement<List>;
		['ui5-li']: CustomElement<StandardListItem>;
		['ui5-li-notification']: CustomElement<NotificationListItem>;
		['ui5-popover']: CustomElement<Popover>;
		['ui5-avatar']: CustomElement<Avatar>;
		['ui5-avatar-group']: CustomElement<AvatarGroup>;
		['ui5-option']: CustomElement<Option>;
		['ui5-radio-button']: CustomElement<RadioButton>;
		['ui5-switch']: CustomElement<Switch>;
		['ui5-select']: CustomElement<Select>;
		['ui5-shellbar']: CustomElement<ShellBar>;
		['ui5-dynamic-page']: CustomElement<DynamicPage>;
		['ui5-dynamic-page-title']: CustomElement<DynamicPageTitle>;
		['ui5-dynamic-page-header']: CustomElement<DynamicPageHeader>;
		['ui5-shellbar']: CustomElement<ShellBar>;
		['ui5-shellbar-item']: CustomElement<ShellBarItem>;
		['ui5-input']: CustomElement<Input>;
		['ui5-icon']: CustomElement<Icon>;
		['ui5-text']: CustomElement<Text>;
		['ui5-textarea']: CustomElement<TextArea>;
		['ui5-timeline']: CustomElement<Timeline>;
		['ui5-toolbar']: CustomElement<Toolbar>;
		['ui5-toolbar-button']: CustomElement<ToolbarButton>;
		['ui5-timeline-item']: CustomElement<TimelineItem>;
		['ui5-date-picker']: CustomElement<DatePicker>;
		['ui5-datetime-picker']: CustomElement<DateTimePicker>;
	  }
	}

	interface Window {
		"profile-popover": Popover,
		"notifications-popover": Popover,
		"lang-settings-popover": Popover,
		"theme-settings-popover": Popover,
		"timezone-settings-popover": Popover,
	}
}

export type {
	Product,
	Filter,
};
