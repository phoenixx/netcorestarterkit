import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ListItem from '../components/listItem';
import { expect } from 'chai';
import { mountWithIntl } from './helpers/intl-enzyme-test-helper';

describe("List item", function () {

    let listItem;
    const expectedText = "somerandomtext";
    const expectedNumber = 7.35;

    beforeEach(() => {
        listItem = mountWithIntl(<ListItem date="2017-12-24" text={expectedText} number={expectedNumber} />);
    });

    it("contains specified text",
        function () {
            const itemUnderTest = listItem.text();
            console.log(`Item under test: ${itemUnderTest}`);
            expect(itemUnderTest).to.have.string(expectedText);
        });

    it("contains formatted currency",
        function () {
            const itemUnderTest = listItem.text();
            console.log(`Item under test: ${itemUnderTest}`);
            expect(itemUnderTest).to.have.string("£7.35");
        });

    it("contains formatted date",
        function () {
            //see http://stackoverflow.com/questions/33656197/javascript-substring-check-using-indexof-or-search-on-a-date-string-with-forward
            const itemUnderTest = listItem.text().toLocaleString().replace(/\u200E/g, "");
            console.log(`Item under test: ${itemUnderTest}`);
            expect(itemUnderTest).to.have.string("24/12/2017");
        });
});