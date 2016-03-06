import {Fragment, Block, Attribute, Pos} from "prosemirror/dist/model"
import {elt, insertCSS} from "prosemirror/dist/dom"
import {TextField} from "../input"
import {defParser, defParamsClick, namePattern, nameTitle, selectedNodeAttr, insertWidget} from "../../utils"
import {Question, qclass} from "./question"

export class ShortAnswer extends Question {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "text"}),
			size: new Attribute({default: "20"}),
			class: new Attribute({default: "widgets-shortanswer "+qclass})
		}
	}
}

defParser(ShortAnswer,"div","widgets-shortanswer")

ShortAnswer.register("command", "insert", {
	label: "Short Answer",
	run(pm, name, size) {
		let {from,to,node} = pm.selection
		if (node && node.type == this)
			return pm.tr.setNodeType(from, this, {name,size}).apply(pm.apply.scroll)
		else {
			let content = Fragment.from([
 			    this.schema.nodes.paragraph.create(null,""),
 			   this.schema.nodes.textfield.create({name,size})
			])
			return insertWidget(pm,from,this.create({name,size},content))
		}
  	},
	menu: {group: "question", rank: 71, display: {type: "label", label: "Short Answer"}},
	params: [
  	    { name: "Name", attr: "name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle}},
     	{ name: "Size", attr: "size", label: "Size in characters", type: "number", default: "20", 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "size") },
	      options: {min: 1, max:80}}
	]
})

defParamsClick(ShortAnswer, "shortanswer:insert")

insertCSS(`
`)