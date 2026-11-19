import { KEYBIND_CATEGORIES, KEYBINDS } from '../../constants/pianoConfig';
import Modal, { type ModalProps } from './Modal';

type props = {
  desc: string;
  keybind: string;
  alt?: boolean;
};

const Shortcut = ({ desc, keybind, alt }: props) => (
  <li className='label flex justify-between items-center gap-4 text-inherit'>
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
    <h2 className='label text-inherit text-center mb-3 text-base pb-1 border-b border-current'>Keyboard Shortcuts</h2>

    <div className='hotkeys-groups flex flex-col gap-3'>
      {KEYBIND_CATEGORIES.map((category) => (
        <section key={category} className='flex flex-col gap-2'>
          <h3 className='label text-inherit self-center text-sm border-b border-current'>{category}</h3>
          <ul className='hotkeys-list flex flex-col gap-4'>
            {Object.values(KEYBINDS)
              .filter((bind) => bind.category === category)
              .map(({ code, text, desc, alt = false }) => (
                <Shortcut key={code} desc={desc} keybind={text} alt={alt} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  </Modal>
);

export default HelpGuide;
