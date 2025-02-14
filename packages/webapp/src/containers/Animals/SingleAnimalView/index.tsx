/*
 *  Copyright 2024 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import styles from './styles.module.scss';
import { ContextForm, Variant } from '../../../components/Form/ContextForm/';
import AnimalReadonlyEdit from './AnimalReadonlyEdit';
import Button from '../../../components/Form/Button';
import Tab, { Variant as TabVariants } from '../../../components/RouterTab/Tab';

export const STEPS = {
  DETAILS: 'details',
} as const;

interface AddAnimalsProps extends RouteComponentProps {
  isCompactSideMenu: boolean;
}

function SingleAnimalView({ isCompactSideMenu, history, match }: AddAnimalsProps) {
  const { t } = useTranslation(['translation', 'common', 'message']);

  const [isEditing, setIsEditing] = useState(false);

  // For now, assuming that the only way to exit edit will be through the cancel button and not through the header
  const initiateEdit = () => {
    setIsEditing(true);
  };

  const onSave = async (data: any, onGoForward: () => void) => {
    console.log(data);
  };

  const getFormSteps = () => [
    {
      FormContent: AnimalReadonlyEdit,
      title: t('ADD_ANIMAL.ANIMAL_DETAILS'),
    },
  ];

  const defaultFormValues = {
    [STEPS.DETAILS]: [],
  };

  const routerTabs = [
    {
      label: t('ANIMAL.TABS.BASIC_INFO'),
      path: match.url,
    },
    {
      label: t('ANIMAL.TABS.TASKS'),
      path: `${match.url}/tasks`,
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        {/* TODO: LF-4381 Header component */}
        <h1>LF-4381 Header component</h1>
        {isEditing ? (
          <Button color={'primary'} disabled>
            ...Editing
          </Button>
        ) : (
          <Button color={'secondary-cta'} onClick={initiateEdit}>
            Toggle Edit
          </Button>
        )}
      </div>
      <Tab
        tabs={routerTabs}
        variant={TabVariants.UNDERLINE}
        isSelected={(tab) => tab.path === match.url}
        onClick={(tab) => history.push(tab.path)}
      />
      <ContextForm
        onSave={onSave}
        hasSummaryWithinForm={false}
        isCompactSideMenu={isCompactSideMenu}
        variant={Variant.STEPPER_PROGRESS_BAR}
        history={history}
        getSteps={getFormSteps}
        defaultFormValues={defaultFormValues}
        cancelModalTitle={t('ANIMALS.EDIT_ANIMAL_FLOW')}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        key={isEditing ? 'edit' : 'readonly'}
      />
    </div>
  );
}

export default SingleAnimalView;
