import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ListItem from '../components/listItem';
//import chai from 'chai'
//import chaiEnzyme from 'chai-enzyme'
import { expect } from 'chai';
import { mountWithIntl } from './helpers/intl-enzyme-test-helper';

//chai.use(chaiEnzyme());

describe("List item", function () {
    it("contains specified text",
        function () {
            const expected = "somerandomtext";
            const listItem = mountWithIntl(<ListItem date="2017-01-01" text={expected} number="2" />);
            const itemUnderTest = listItem.text();
            console.log(`Item under test: ${itemUnderTest}`);
            expect(listItem.text()).to.have.string(expected);
        });

    it("contains formatted currency",
        function () {
            const listItem = mountWithIntl(<ListItem date="2017-01-01" text="test" number="7.35" />);
            const itemUnderTest = listItem.text();
            console.log(`Item under test: ${itemUnderTest}`);
            expect(itemUnderTest).to.have.string("£7.35");
        });

    it("contains formatted date",
        function () {
            const listItem = mountWithIntl(<ListItem date="2017-12-24" text="test" number="8" />);
            //see http://stackoverflow.com/questions/33656197/javascript-substring-check-using-indexof-or-search-on-a-date-string-with-forward
            const itemUnderTest = listItem.text().toLocaleString().replace(/\u200E/g, "");
            console.log(`Item under test: ${itemUnderTest}`);
            expect(itemUnderTest).to.have.string("24/12/2017");
        });
});