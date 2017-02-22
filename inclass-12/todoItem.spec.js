import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        const mytodoItem = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem mytodoItem id={0} text={"myText"} done={false} toggle={_=>_} remove={_=>_}/>    
            </div>
        )
        // findDOMNode and assert 3 children of the ToDoItem element
        const elements = findDOMNode(mytodoItem).children[0]
        expect(elements.children.length).to.equal(3)
        // assert the innerHTML of the todo is the text you initially set
        expect(elements.children[1].innerHTML).to.equal('myText')
        
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        const mytodoItem = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem mytodoItem id={0} text={"myText"} done={false} toggle={_=>_} remove={_=>_}/>    
            </div>
        )
        // findDOMNode and assert 3 children of the ToDoItem element
        const elements = findDOMNode(mytodoItem).children[0]
        expect(elements.children.length).to.equal(3)
        // assert there is no child with classname 'completed'
        const completed = findByClassname(elements.children, 'completed')
        expect(completed).to.equal(null)
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        const mytodoItem = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem mytodoItem id={0} text={"myText"} done={false} toggle={()=>toggled=true} remove={_=>_}/>    
            </div>
        )
        const elements = findDOMNode(mytodoItem).children[0]
        // when the checkbox is clicked via TestUtils.Simulate.click()
        TestUtils.Simulate.click(elements.children[0])
        // we expect the variable toggled to be true
        expect(toggled).to.be.true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        const mytodoItem = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem mytodoItem id={0} text={"myText"} done={false} toggle={_=>_} remove={()=>removed=true}/>    
            </div>
        )
        const elements = findDOMNode(mytodoItem).children[0]
        // when the remove button is clicked via TestUtils.Simulate.click()
         TestUtils.Simulate.click(elements.children[2])
        // we expect the variable removed to be true
        expect(removed).to.be.true
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        const mytodoItem = TestUtils.renderIntoDocument(
            <div>
            <ToDoItem mytodoItem id={0} text={"myText"} done={true} toggle={_=>_} remove={()=>removed=true}/>    
            </div>
        )
        const elements = findDOMNode(mytodoItem).children[0]
        // the item should have done=true
        expect(elements.children[1].className).to.equal('completed')
        // assert that the rendered className is "completed"
    })

})
