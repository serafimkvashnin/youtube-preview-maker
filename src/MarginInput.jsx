import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const MarginInput = ({ label, value, onChange }) => (
    <FloatingLabel label={label} controlId="floatingInput" className=' text-truncate'>
        <Form.Control
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        />
    </FloatingLabel>
);

export default MarginInput;
