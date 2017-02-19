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
            console.log(listItem.text());
            expect(listItem.text()).to.have.string(expected);
        });

    it("contains formatted currency",
        function () {
            const listItem = mountWithIntl(<ListItem date="2017-01-01" text="test" number="7.35" />);
            console.log(listItem.text());
            expect(listItem.text()).to.have.string("£7.35");
        });

    it("contains formatted date",
        function () {
            const listItem = mountWithIntl(<ListItem date="2017-12-24" text="test" number="8" />);
            console.log(listItem.text());
            expect(listItem.text()).to.have.string("24/12/2017");
        });
});