import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

const TextInput = ({ label, value, onChange }) => (
    <FloatingLabel label={label} controlId="floatingInput" className='text-truncate'>
        <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    </FloatingLabel>
);

export default TextInput;
