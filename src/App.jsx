import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import ImageCanvas from './ImageCanvas';
import TextInput from './TextInput';
import MarginInput from './MarginInput';
import FontSelector from './FontSelector';

function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [topText, setTopText] = useState('ВЛОГ');
    const [bottomText, setBottomText] = useState('ДЕНЬ');
    const [font, setFont] = useState('Seymour One');
    const [fontSize, setFontSize] = useState(148);
    const [topMargin, setTopMargin] = useState(64);
    const [bottomMargin, setBottomMargin] = useState(64);
    const [leftMargin, setLeftMargin] = useState(64);
    const canvasRef = useRef(null);

    const availableFonts = [
        'Arial',
        'Roboto',
        'Open Sans',
        'Rampart One',
        'Seymour One',
    ];

    useEffect(() => {
        const handleResize = () => drawCanvas();
        window.addEventListener('resize', handleResize);

        if (canvasRef.current) {
            drawCanvas();
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [
        imageSrc,
        topText,
        bottomText,
        font,
        fontSize,
        topMargin,
        bottomMargin,
        leftMargin,
    ]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            ctx.font = `${fontSize}px ${font}`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';

            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.shadowBlur = 10;

            ctx.lineWidth = fontSize * 0.2;
            ctx.strokeStyle = 'black';
            ctx.strokeText(topText, leftMargin, topMargin + fontSize);
            ctx.strokeText(
                bottomText,
                leftMargin,
                canvas.height - bottomMargin - ctx.lineWidth * 2
            );

            ctx.fillStyle = 'white';
            ctx.fillText(topText, leftMargin, topMargin + fontSize);
            ctx.fillText(
                bottomText,
                leftMargin,
                canvas.height - bottomMargin - ctx.lineWidth * 2
            );
        };
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => setImageSrc(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'youtube_preview.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <Container fluid style={{ maxWidth: '720px' }}>
            <h1 className="m-3 text-center">Youtube Preview Maker</h1>
            <Form className="mx-2">
                <Row className="p-1">
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </Row>

                <Row>
                    <Col className="p-1">
                        <TextInput
                            label="Top Text:"
                            value={topText}
                            onChange={setTopText}
                        />
                    </Col>
                    <Col className="p-1">
                        <TextInput
                            label="Bottom Text:"
                            value={bottomText}
                            onChange={setBottomText}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="p-1">
                        <MarginInput
                            label="Top Margin:"
                            value={topMargin}
                            onChange={setTopMargin}
                        />
                    </Col>
                    <Col className="p-1">
                        <MarginInput
                            label="Down Margin:"
                            value={bottomMargin}
                            onChange={setBottomMargin}
                        />
                    </Col>
                    <Col className="p-1">
                        <MarginInput
                            label="Left Margin:"
                            value={leftMargin}
                            onChange={setLeftMargin}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="p-1">
                        <FontSelector
                            font={font}
                            setFont={setFont}
                            availableFonts={availableFonts}
                        />
                    </Col>
                    <Col className="p-1">
                        <MarginInput
                            label="Font Size:"
                            value={fontSize}
                            onChange={setFontSize}
                        />
                    </Col>
                </Row>

                <Row className="p-1">
                    <Button
                        onClick={handleSave}
                        style={{ width: '100%' }}
                        disabled={!imageSrc}
                    >
                        Save Image
                    </Button>
                </Row>

                {imageSrc && (
                    <>
                        <hr />{' '}
                        <Row className="m-1">
                            {' '}
                            <ImageCanvas ref={canvasRef} />
                        </Row>{' '}
                    </>
                )}
            </Form>
        </Container>
    );
}

export default App;
