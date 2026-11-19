import { KEYBIND_CATEGORIES, KEYBINDS } from '../../constants/pianoConfig';
import Modal, { type ModalProps } from './Modal';

type props = {
  keybinds: string[];
  desc?: string;
  alt?: boolean;
};

const Shortcut = ({ keybinds, desc = '', alt }: props) => {
  const kbds = keybinds.map((keybind) => <kbd key={keybind}>{keybind}</kbd>);

  return (
    <li className='label flex justify-between items-center gap-4 text-inherit'>
      {desc}
      <span>
        {kbds}
        {alt && (
          <>
            /{kbds}+<kbd>Alt</kbd>
          </>
        )}
      </span>
    </li>
  );
};

const HelpGuide = (props: ModalProps) => (
  <Modal keybinds={Object.keys(KEYBINDS.HELP.keys)} {...props}>
    <h2 className='label text-inherit text-center mb-4 text-base pb-2 border-b border-current'>Keyboard Shortcuts</h2>
    <div className='hotkeys-groups flex flex-col gap-4'>
      {KEYBIND_CATEGORIES.map((category) => (
        <section key={category} className='flex flex-col gap-2'>
          <h3 className='label text-inherit self-center text-sm border-b border-current'>{category}</h3>
          <ul className='hotkeys-list flex flex-col gap-4'>
            {Object.values(KEYBINDS)
              .filter((bind) => bind.category === category)
              .map(({ keys, desc, alt }, i) => (
                <Shortcut key={i} desc={desc} keybinds={Object.values(keys)} alt={alt} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  </Modal>
);

export default HelpGuide;
