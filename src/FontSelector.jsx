import React from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const FontSelector = ({ font, setFont, availableFonts }) => (
    <FloatingLabel controlId="floatingSelect" label="Font:">
      <Form.Select title={font} onChange={(e) => {console.error(e.target.value); setFont(e.target.value);}}>
        {availableFonts.map((fontName, i) => (
          <option key={i}>
            {fontName}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
);

export default FontSelector;
