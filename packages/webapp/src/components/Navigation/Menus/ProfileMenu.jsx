import { logout } from '../../../util/jwt';
import { getLanguageFromLocalStorage } from '../../../util/getLanguageFromLocalStorage';
import { ReactComponent as LogoutIcon } from '../../../assets/images/navbar/logout.svg';
import { ReactComponent as MyInfoIcon } from '../../../assets/images/navbar/my-info.svg';
import { ReactComponent as HelpIcon } from '../../../assets/images/navbar/help.svg';
import { ReactComponent as VideoIcon } from '../../../assets/images/navbar/play-square.svg';
import { ReactComponent as SwitchFarmIcon } from '../../../assets/images/navbar/switch-farm.svg';
import { ReactComponent as LaunchIcon } from '../../../assets/images/icon_launch.svg';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const ProfileMenu = ({ history, open, onClose, target, closeFloater }) => {
  const { t } = useTranslation(['translation']);
  const selectedLanguage = getLanguageFromLocalStorage();

  const logOutClick = () => {
    logout();
    closeFloater();
  };

  const openTutorialsClick = () => {
    const playlistIDs = {
      es: 'PLDRpVZ4VsXJhghxfEQuApFQTeCWUbGBN9',
      pt: 'PLDRpVZ4VsXJg0ke20m47MmJq6uAJAlAGF',
      en: 'PLDRpVZ4VsXJgVGrmmXJooNqceXvre8IDY',
    };

    const playList = playlistIDs[selectedLanguage] || playlistIDs['en'];
    const url = 'https://www.youtube.com/playlist?list=' + playList;

    const win = window.open(url, '_blank');
    win.focus();
    closeFloater();
  };

  const handleClick = (link) => {
    history.push(link);
    closeFloater();
  };
  const options = [
    {
      id: 'user-profile',
      onClick: () => handleClick('/profile'),
      icon: <MyInfoIcon />,
      label: t('PROFILE_FLOATER.INFO'),
      externalLink: false,
    },
    {
      id: 'farm-selection',
      onClick: () => handleClick('/farm_selection'),
      icon: <SwitchFarmIcon />,
      label: t('PROFILE_FLOATER.SWITCH'),
      externalLink: false,
    },
    {
      id: 'help',
      onClick: () => handleClick('/help'),
      icon: <HelpIcon />,
      label: t('PROFILE_FLOATER.HELP'),
      externalLink: false,
    },
    {
      id: 'tutorials',
      onClick: openTutorialsClick,
      icon: <VideoIcon />,
      label: t('PROFILE_FLOATER.TUTORIALS'),
      externalLink: true,
    },
    {
      id: 'logout',
      onClick: logOutClick,
      icon: <LogoutIcon style={{ transform: 'translateX(2px)' }} />,
      label: t('PROFILE_FLOATER.LOG_OUT'),
      externalLink: false,
    },
  ];
  const menuItems = options.map((option) => {
    const { id, onClick, icon, label, externalLink } = option;
    return (
      <MenuItem key={id} onClick={onClick} classes={{ root: styles.menuItemRoot }}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText classes={{ root: styles.itemTextRoot }}>{label}</ListItemText>
        {externalLink && <LaunchIcon />}
      </MenuItem>
    );
  });
  return (
    <Menu
      id="profile-menu"
      anchorEl={target.current}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'profile-navigation-button',
      }}
      classes={{ list: styles.menuList, root: styles.menuRoot }}
    >
      {menuItems}
    </Menu>
  );
};
export default ProfileMenu;
