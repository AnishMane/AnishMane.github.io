import { MENU_APPS, MENU_ITEMS } from '@/common/constant/menu';

import Menu from './Menu';
import Breakline from '../elements/Breakline';

const Navigation = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  const filteredAppsMenu = MENU_APPS?.filter((item) => item?.isShow);

  return (
    <>
      <Menu list={filteredMenu} />
      <div className='space-y-1'>
        <Menu list={filteredAppsMenu} />
      </div>
    </>
  );
};

export default Navigation;
