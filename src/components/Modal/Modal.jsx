import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent } from './ModalContent';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends PureComponent {
  render() {
    return createPortal(
      <div className={css.modal}>
        <ModalContent {...this.props} />
      </div>,
      modalRoot
    );
  }
}
