import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { FromToDateContainer } from '../../../components/Inputs/DateContainer';
import { setDateRange } from '../../../containers/Finances/actions';
import moment from 'moment';
import InfoBoxComponent from '../../InfoBoxComponent';
import { dateRangeSelector } from '../../../containers/Finances/selectors';
import { Semibold } from '../../Typography';
import { useTranslation } from 'react-i18next';

const DateRangeSelector = ({ changeDateMethod, hideTooltip }) => {
  const dateRange = useSelector((state) => dateRangeSelector(state));
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(
    dateRange && dateRange.startDate ? moment(dateRange.startDate) : moment().startOf('year'),
  );
  const [endDate, setEndDate] = useState(
    dateRange && dateRange.endDate ? moment(dateRange.endDate) : moment().endOf('year'),
  );
  const [validRange, setValidRange] = useState(startDate <= endDate);

  useEffect(() => {
    setStartDate(
      dateRange && dateRange.startDate ? moment(dateRange.startDate) : moment().startOf('year'),
    );
    setEndDate(dateRange && dateRange.endDate ? moment(dateRange.endDate) : moment().endOf('year'));
  }, [dateRange]);

  const changeStartDate = (date) => {
    if (date > endDate) {
      setValidRange(false);
      return;
    }
    setValidRange(true);
    setStartDate(date);
    dispatch(setDateRange({ startDate: date, endDate }));
    changeDateMethod('start', date);
  };

  const changeEndDate = (date) => {
    if (date < startDate) {
      setValidRange(false);
      return;
    }
    setValidRange(true);
    setEndDate(date);
    dispatch(setDateRange({ startDate, endDate: date }));
    changeDateMethod('end', date);
  };

  return (
    <div className={styles.rangeContainer}>
      <div className={styles.titleContainer}>
        <Semibold style={{ textAlign: 'left', marginBottom: '20px' }}>
          {t('DATE_RANGE.TITLE')}
        </Semibold>
        {!hideTooltip && (
          <InfoBoxComponent
            customStyle={{ float: 'right' }}
            title={t('DATE_RANGE.HELP_TITLE')}
            body={t('DATE_RANGE.HELP_BODY')}
          />
        )}
      </div>

      <FromToDateContainer
        onStartDateChange={changeStartDate}
        onEndDateChange={changeEndDate}
        endDate={endDate}
        startDate={startDate}
      />
      {!validRange && (
        <Semibold style={{ textAlign: 'center', color: 'red' }}>
          {t('DATE_RANGE.INVALID_RANGE_MESSAGE')}
        </Semibold>
      )}
    </div>
  );
};

export default DateRangeSelector;
