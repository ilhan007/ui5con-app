type Product = {
	key?: number,
	perishable: boolean;
	vegs?: boolean;
	status: string | null;
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
import type Input from "@ui5/webcomponents/dist/Input";
import type TextArea from "@ui5/webcomponents/dist/TextArea";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker";
import type Select from "@ui5/webcomponents/dist/Select";
import type Option from "@ui5/webcomponents/dist/Option";
import type RadioButton from "@ui5/webcomponents/dist/RadioButton";
import type Card from "@ui5/webcomponents/dist/Card";
import type CardHeader from "@ui5/webcomponents/dist/CardHeader";

import type Avatar from "@ui5/webcomponents/dist/Avatar.js";
import type AvatarGroup from "@ui5/webcomponents/dist/AvatarGroup.js";
import type Switch from "@ui5/webcomponents/dist/Switch.js";
import type Table from "@ui5/webcomponents/dist/Table.js";
import type TableColumn from "@ui5/webcomponents/dist/TableColumn.js";
import type TableRow from "@ui5/webcomponents/dist/TableRow.js";
import type TableCell from "@ui5/webcomponents/dist/TableCell.js";
import type Label from "@ui5/webcomponents/dist/Label.js";
import type Badge from "@ui5/webcomponents/dist/Badge.js";

import type Tab from "@ui5/webcomponents/dist/Tab";
import type TabContainer from "@ui5/webcomponents/dist/TabContainer";
import type TabSeparator from "@ui5/webcomponents/dist/TabSeparator";
import type Button from "@ui5/webcomponents/dist/Button";
import type Popover from "@ui5/webcomponents/dist/Popover";
import type Title from "@ui5/webcomponents/dist/Title";
import type List from "@ui5/webcomponents/dist/List";
import type StandardListItem from "@ui5/webcomponents/dist/StandardListItem";
import type NotificationListItem from "@ui5/webcomponents-fiori/dist/NotificationListItem";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import type Icon from "@ui5/webcomponents/dist/Icon";

import type Timeline from "@ui5/webcomponents-fiori/dist/Timeline";
import type TimelineItem from "@ui5/webcomponents-fiori/dist/TimelineItem";

declare global {
	namespace JSX {
	  interface IntrinsicElements {
		['ui5-card']: CustomElement<Card>;
		['ui5-card-header']: CustomElement<CardHeader>;
		['ui5-tab']: CustomElement<Tab>;
		['ui5-tabcontainer']: CustomElement<TabContainer>;
		['ui5-tab-separator']: CustomElement<TabSeparator>;
		['ui5-button']: CustomElement<Button>;
		['ui5-title']: CustomElement<Title>;
		['ui5-table']: CustomElement<Table>;
		['ui5-table-row']: CustomElement<TableRow>;
		['ui5-table-cell']: CustomElement<TableCell>;
		['ui5-table-column']: CustomElement<TableColumn>;
		['ui5-label']: CustomElement<Label>;
		['ui5-badge']: CustomElement<Badge>;
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
		['ui5-shellbar-item']: CustomElement<ShellBarItem>;
		['ui5-input']: CustomElement<Input>;
		['ui5-icon']: CustomElement<Icon>;
		['ui5-textarea']: CustomElement<TextArea>;
		['ui5-timeline']: CustomElement<Timeline>;
		['ui5-timeline-item']: CustomElement<TimelineItem>;
		['ui5-date-picker']: CustomElement<DatePicker>;
	  }
	}

	interface Window {
		"profile-popover": Popover,
		"notifications-popover": Popover,
		"lang-settings-popover": Popover,
		"theme-settings-popover": Popover,
	}
}

export type {
	Product,
	Filter,
};
