import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import SimpsonsList from './SimpsonsList';

describe('SimpsonList component', () => {

    test('renders list', () => {
        render(<Router getData={getData}>
                    <SimpsonsList />
                </Router>
        );
      
        const wordelement = screen.getByText('Simpson', {exact: false})
        expect(wordelement).toBeInTheDocument();
      });

})
