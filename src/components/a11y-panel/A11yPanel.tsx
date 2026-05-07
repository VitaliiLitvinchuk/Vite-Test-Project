import React, { useRef, useEffect } from 'react';
import { Offcanvas, Button, Form, ButtonGroup } from 'react-bootstrap';
import { useA11yStore } from '../../store/a11yStore';
import './A11yPanel.css';

export const A11yPanel: React.FC = () => {
  const state = useA11yStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (state.isOpen && closeButtonRef.current) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [state.isOpen]);

  return (
    <Offcanvas 
      show={state.isOpen} 
      onHide={state.togglePanel} 
      placement="end"
      className="a11y-panel"
      aria-labelledby="a11y-panel-title"
    >
      <Offcanvas.Header>
        <Offcanvas.Title id="a11y-panel-title">Панель доступності</Offcanvas.Title>
        <button 
          ref={closeButtonRef}
          type="button" 
          className="btn-close" 
          aria-label="Закрити панель доступності" 
          onClick={state.togglePanel}
        />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="mb-4">
          <Button variant="danger" className="w-100" onClick={state.resetAll} aria-label="Скинути всі налаштування">
            <i className="fa fa-refresh me-2"></i>Скинути налаштування
          </Button>
        </div>

        <section className="mb-4">
          <h3 className="h5 mb-3">Візуальна адаптація</h3>
          
          <div className="mb-3">
            <Form.Label htmlFor="fontSizeSelect">Розмір тексту</Form.Label>
            <Form.Select 
              id="fontSizeSelect"
              value={state.fontSize} 
              onChange={(e) => state.setFontSize(Number(e.target.value))}
              aria-label="Оберіть розмір тексту"
            >
              <option value="1">Стандартний (100%)</option>
              <option value="1.2">Збільшений (120%)</option>
              <option value="1.4">Великий (140%)</option>
              <option value="1.6">Дуже великий (160%)</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="lineHeightSelect">Міжрядковий інтервал</Form.Label>
            <Form.Select 
              id="lineHeightSelect"
              value={state.lineHeight} 
              onChange={(e) => state.setLineHeight(Number(e.target.value))}
            >
              <option value="1.5">Стандартний</option>
              <option value="1.75">Збільшений</option>
              <option value="2.0">Подвійний</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="letterSpacingSelect">Міжлітерний інтервал</Form.Label>
            <Form.Select 
              id="letterSpacingSelect"
              value={state.letterSpacing} 
              onChange={(e) => state.setLetterSpacing(Number(e.target.value))}
            >
              <option value="0">Стандартний</option>
              <option value="0.05">Широкий</option>
              <option value="0.1">Дуже широкий</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label>Вирівнювання тексту</Form.Label>
            <ButtonGroup className="w-100" aria-label="Вирівнювання тексту">
              <Button 
                variant={state.textAlign === 'left' ? 'primary' : 'outline-secondary'} 
                onClick={() => state.setTextAlign('left')}
                aria-pressed={state.textAlign === 'left'}
                aria-label="Вирівняти по лівому краю"
              ><i className="fa fa-align-left"></i></Button>
              <Button 
                variant={state.textAlign === 'center' ? 'primary' : 'outline-secondary'} 
                onClick={() => state.setTextAlign('center')}
                aria-pressed={state.textAlign === 'center'}
                aria-label="Вирівняти по центру"
              ><i className="fa fa-align-center"></i></Button>
              <Button 
                variant={state.textAlign === 'right' ? 'primary' : 'outline-secondary'} 
                onClick={() => state.setTextAlign('right')}
                aria-pressed={state.textAlign === 'right'}
                aria-label="Вирівняти по правому краю"
              ><i className="fa fa-align-right"></i></Button>
              <Button 
                variant={state.textAlign === 'initial' ? 'primary' : 'outline-secondary'} 
                onClick={() => state.setTextAlign('initial')}
                aria-pressed={state.textAlign === 'initial'}
                aria-label="Скинути вирівнювання"
              ><i className="fa fa-times"></i></Button>
            </ButtonGroup>
          </div>
        </section>

        <section className="mb-4">
          <h3 className="h5 mb-3">Кольори та контраст</h3>
          
          <div className="mb-3">
            <Form.Label htmlFor="contrastSelect">Контрастність</Form.Label>
            <Form.Select 
              id="contrastSelect"
              value={state.contrast} 
              onChange={(e) => state.setContrast(e.target.value as any)}
            >
              <option value="normal">Стандартна</option>
              <option value="high">Висока (світла тема)</option>
              <option value="dark">Висока (темна тема)</option>
            </Form.Select>
          </div>

          <Form.Check 
            type="switch"
            id="invertColorsSwitch"
            label="Інверсія кольорів"
            checked={state.invertColors}
            onChange={(e) => state.setInvertColors(e.target.checked)}
            className="mb-2"
          />

          <Form.Check 
            type="switch"
            id="monochromeSwitch"
            label="Монохромний режим"
            checked={state.monochrome}
            onChange={(e) => state.setMonochrome(e.target.checked)}
            className="mb-3"
          />

          <div className="mb-3">
            <Form.Label htmlFor="saturationSelect">Насиченість</Form.Label>
            <Form.Select 
              id="saturationSelect"
              value={state.saturation} 
              onChange={(e) => state.setSaturation(e.target.value as any)}
            >
              <option value="normal">Стандартна</option>
              <option value="high">Висока</option>
              <option value="low">Низька</option>
              <option value="desaturate">Знебарвлено</option>
            </Form.Select>
          </div>
        </section>

        <section className="mb-4">
          <h3 className="h5 mb-3">Навігація та взаємодія</h3>
          
          <Form.Check 
            type="switch"
            id="highlightLinksSwitch"
            label="Підсвічувати посилання"
            checked={state.highlightLinks}
            onChange={(e) => state.setHighlightLinks(e.target.checked)}
            className="mb-2"
          />

          <Form.Check 
            type="switch"
            id="bigCursorSwitch"
            label="Великий курсор"
            checked={state.bigCursor}
            onChange={(e) => state.setBigCursor(e.target.checked)}
            className="mb-2"
          />

          <Form.Check 
            type="switch"
            id="pauseAnimationsSwitch"
            label="Зупинити анімації"
            checked={state.pauseAnimations}
            onChange={(e) => state.setPauseAnimations(e.target.checked)}
          />
        </section>

      </Offcanvas.Body>
    </Offcanvas>
  );
};
