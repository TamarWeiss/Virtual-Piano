import { KEYBINDS } from '../../constants/pianoConfig';
import Modal, { type ModalProps } from './Modal';

const HelpGuide = (props: ModalProps) => {
  return (
    <Modal keybinds={[KEYBINDS.HELP.code]} {...props}>
      This is a modal
    </Modal>
  );
};

export default HelpGuide;
