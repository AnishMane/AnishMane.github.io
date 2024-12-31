import { BsFillBootstrapFill, BsRobot } from 'react-icons/bs';
import {
  SiAdobeaftereffects ,
  SiJupyter ,
  SiCss3,
  SiExpress,
  SiPython ,
  SiDocker ,
  SiPostman ,
  SiJavascript,
  SiMongodb ,
  SiJquery,
  SiGithub,
  SiMui,
  SiNextdotjs,
  SiLinux ,
  SiNodedotjs,
  SiPandas ,
  SiNumpy ,
  SiQuasar ,
  SiAwslambda ,
  SiReact,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';

export type stacksProps = {
  [key: string]: JSX.Element;
};

const iconSize = 20;

export const STACKS: stacksProps = {
  Numpy: <SiNumpy  size={iconSize} className='text-blue-500' />,
  JavaScript: <SiJavascript size={iconSize} className='text-yellow-400' />,
  TypeScript: <SiTypescript size={iconSize} className='text-blue-400' />,
  'Next.js': <SiNextdotjs size={iconSize} />,
  'React.js': <SiReact size={iconSize} className='text-sky-500' />,
  TailwindCSS: <SiTailwindcss size={iconSize} className='text-cyan-300' />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className='text-purple-500' />
  ),
  Postman: <SiPostman  size={iconSize} className='text-pink-600' />,
  Jupyter: <SiJupyter  size={iconSize} />,
  GitHub: <SiGithub size={iconSize} />,
  'Material UI': <SiMui size={iconSize} className='text-sky-400' />,
  Vite: <SiVite size={iconSize} className='text-purple-500' />,
  Quasar: <SiQuasar  size={iconSize} className='text-emerald-500' />,
  Python: <SiPython  size={iconSize} className='text-yellow-500' />,
  'Artificial Intelligence': (
    <BsRobot size={iconSize} className='text-rose-500' />
  ),
 AfterEffects: <SiAdobeaftereffects  size={iconSize} className='text-red-500' />,
  'Vue.js': <SiVuedotjs size={iconSize} className='text-green-500' />,
  'Pandas': <SiPandas  size={iconSize} className='text-green-400' />,
  'Node.js': <SiNodedotjs size={iconSize} className='text-green-600' />,
  Docker: <SiDocker  size={iconSize} className='text-purple-600' />,
  'Styled Components': (
    <SiStyledcomponents size={iconSize} className='text-pink-500' />
  ),
  Lambda: <SiAwslambda  size={iconSize} className='text-amber-600' />,
  Linux: <SiLinux  size={iconSize} className='text-green-500' />,
  MongoDB: <SiMongodb  size={iconSize} className='text-red-600' />,
  CSS: <SiCss3 size={iconSize} className='text-blue-300' />,
  Express: <SiExpress size={iconSize} />,
  Jquery: <SiJquery size={iconSize} />,
};
