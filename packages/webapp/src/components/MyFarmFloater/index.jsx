import React from 'react';
import { ReactComponent as FarmMapIcon } from '../../assets/images/farm-profile/farm-map.svg';
import { ReactComponent as FarmInfoIcon } from '../../assets/images/farm-profile/farm-info.svg';
import { ReactComponent as PeopleIcon } from '../../assets/images/farm-profile/people.svg';
import { ReactComponent as CertificationsIcon } from '../../assets/images/farm-profile/certificate.svg';
import ListOption from '../Navigation/NavBar/ListOption';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userFarmSelector } from '../../containers/userFarmSlice';
import { Tooltip } from '@material-ui/core';

export function PureMyFarmFloaterComponent({
  farmInfo,
  farmMap,
  people,
  certification,
  isAdmin,
}) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        maxWidth: '148px',
        minWidth: '138px',
        backgroundColor: 'white',
        borderRadius: '4px',
        marginRight: '-4px',
      }}
    >
      <ListOption
        clickFn={farmInfo}
        iconText={t('MY_FARM.FARM_INFO')}
        icon={<FarmInfoIcon />}
      />
      <ListOption
        clickFn={farmMap}
        iconText={t('MY_FARM.FARM_MAP')}
        icon={<FarmMapIcon />}
      />
      <ListOption
        clickFn={people}
        iconText={t('MY_FARM.PEOPLE')}
        icon={<PeopleIcon />}
      />
      {isAdmin && (
        <ListOption
          clickFn={certification}
          iconText={t('MY_FARM.CERTIFICATIONS')}
          icon={<CertificationsIcon />}
        />
      )}
    </div>
  );
}

export default function PureMyFarmFloater({
  children,
  farmInfoClick,
  farmMapClick,
  peopleClick,
  certificationClick,
  isIntroducingFarmMap,
}) {
  const { is_admin } = useSelector(userFarmSelector);
  const Wrapper = (
    <PureMyFarmFloaterComponent
      farmInfo={farmInfoClick}
      farmMap={farmMapClick}
      people={peopleClick}
      certification={certificationClick}
      isIntroducingFarmMap={isIntroducingFarmMap}
      isAdmin={is_admin}
    />
  );
  return (
    <Tooltip
      title={Wrapper}
      placement={'bottom-end'}
      // open={openProfile || isIntroductionActive}
      // styles={{
      //   floater: {
      //     zIndex: 1500,
      //     display: openProfile || isIntroductionActive ? 'initial' : 'none',
      //   },
      // }}
    >
      {children}
    </Tooltip>
  );
}
