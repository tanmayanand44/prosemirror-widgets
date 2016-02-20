import {Block, Attribute} from "prosemirror/dist/model"
import {elt,insertCSS} from "prosemirror/dist/dom"
import {defParser, defParamsClick, selectedNodeAttr, insertWidget} from "../../utils"

export class SpreadSheet extends Block {
	get attrs() {
		return {
			data: new Attribute
		}
	}
	get contains() { return null }
}

defParser(SpreadSheet,"div","widgets-spreadsheet")

SpreadSheet.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", { class: "widgets-spreadsheet widgets-edit"});
		// wait until node is attached to document to render
		window.setTimeout(function() {
			let data = [
	            ["", "Ford", "Volvo", "Toyota", "Honda"],
	            ["2014", 10, 11, 12, 13],
	            ["2015", 20, 11, 14, 13],
	            ["2016", 30, 15, 12, 13]
	        ];
	
	        new Handsontable(node.rendered, {
	        	data: data,
	            minSpareRows: 1,
	            rowHeaders: true,
	            colHeaders: true,
	            contextMenu: true
	        });
		}, 100)
	}
	return node.rendered; 
}

SpreadSheet.register("command", "insert", {
	derive: {
	    params: [
	      	{ name: "Data Link", attr: "data", label: "Link to CSV (fixed for demo)", type: "file", default: "cars.csv", 
	   	      prefill: function(pm) { return selectedNodeAttr(pm, this, "data") }}
	 	]
	},
	label: "SpreadSheet",
	menu: {group: "content", rank: 75, display: {type: "label", label: "Spreadsheet"}},
})

defParamsClick(SpreadSheet,"spreadsheet:insert",["all"])

insertCSS(`

.ProseMirror .widgets-spreadsheet {
	display: inline-block;
}

`)