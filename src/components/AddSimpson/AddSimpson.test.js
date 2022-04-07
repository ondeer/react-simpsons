import { render, screen } from '@testing-library/react';

import AddSimpson from './AddSimpson';
import App from '../../App'

describe('AddSimpson component', () => {

    test('test your component', () => {
        const app = render(<App/>)
        const wrapper = render(<AddSimpson getData={app.getData} />);
      
        expect(wrapper.find('h2').text()).toEqual('Add Character');
      });

})
