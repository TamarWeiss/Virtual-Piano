import { KEYBINDS } from '../../constants/pianoConfig';
import Modal, { type ModalProps } from './Modal';

type props = {
  desc: string;
  keybind: string;
  alt?: boolean;
};

const Shortcut = ({ desc, keybind, alt }: props) => (
  <li className='label flex justify-between items-center text-[0.9rem] text-inherit'>
    {desc}
    <span>
      <kbd>{keybind}</kbd>{' '}
      {alt && (
        <>
          / <kbd>{keybind}</kbd> + <kbd>Alt</kbd>
        </>
      )}
    </span>
  </li>
);

const HelpGuide = (props: ModalProps) => (
  <Modal keybinds={[KEYBINDS.HELP.code]} {...props}>
    <h2 className='header flex justify-center mb-4 label text-base pb-3 border-b border-current'>Keyboard Shortcuts</h2>

    <ul className='hotkeys-list flex flex-col gap-3'>
      {Object.values(KEYBINDS).map(({ text }) => (
        <Shortcut desc='Sample Text' keybind={text} />
      ))}
    </ul>
  </Modal>
);

export default HelpGuide;
