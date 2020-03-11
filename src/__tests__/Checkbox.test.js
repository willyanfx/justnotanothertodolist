import React from 'react';
import {
    render,
    cleanup,
    fireEvent,
    queryAllByRole
} from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

beforeEach(cleanup);

jest.mock('../db', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn()
                }))
            }))
        }))
    }
}));

describe('<Checkbox />', () => {
    describe('Success', () => {
        it('render the task checkbox', () => {
            const { getByRole } = render(<Checkbox />);
            expect(getByRole('checkbox')).toBeTruthy();
        });
        it('renders the task checkbox and accepts a onClick', () => {
            const { getByRole } = render(<Checkbox />);
            expect(getByRole('checkbox')).toBeTruthy();
            fireEvent.click(getByRole('checkbox'));
        });
        it('renders the task checkbox and accepts a onClick', () => {
            const { getByRole } = render(<Checkbox />);
            expect(getByRole('checkbox')).toBeTruthy();
            fireEvent.click(getByRole('checkbox'));
        });
    });
});
