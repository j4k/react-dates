import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import ChevronUp from './ChevronUp';
import ChevronDown from './ChevronDown';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,
  isRTL: false,
};

function DayPickerNavigation({
  navPrev,
  navNext,
  onPrevMonthClick,
  onNextMonthClick,
  orientation,
  phrases,
  isRTL,
  styles,
}) {
  const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    let Icon = isVertical ? ChevronUp : LeftArrow;
    if (isRTL && !isVertical) {
      Icon = RightArrow;
    }
    navPrevIcon = (
      <Icon
        {...css(
          isHorizontal && styles.DayPickerNavigation_svg__horizontal,
          isVertical && styles.DayPickerNavigation_svg__vertical,
        )}
      />
    );
  }

  if (!navNextIcon) {
    isDefaultNavNext = true;
    let Icon = isVertical ? ChevronDown : RightArrow;
    if (isRTL && !isVertical) {
      Icon = LeftArrow;
    }
    navNextIcon = (
      <Icon
        {...css(
          isHorizontal && styles.DayPickerNavigation_svg__horizontal,
          isVertical && styles.DayPickerNavigation_svg__vertical,
        )}
      />
    );
  }

  const isDefaultNav =
    isVerticalScrollable ? isDefaultNavNext : (isDefaultNavNext || isDefaultNavPrev);

  return (
    <div
      {...css(
        styles.DayPickerNavigation,
        isHorizontal && styles.DayPickerNavigation__horizontal,
        ...isVertical && [
          styles.DayPickerNavigation__vertical,
          isDefaultNav && styles.DayPickerNavigation__verticalDefault,
        ],
        ...isVerticalScrollable && [
          styles.DayPickerNavigation__verticalScrollable,
          isDefaultNav && styles.DayPickerNavigation__verticalScrollableDefault,
        ],
      )}
    >
      {!isVerticalScrollable && (
        <button
          {...css(
            styles.DayPickerNavigation_button,
            isDefaultNavPrev && styles.DayPickerNavigation_button__default,
            ...(isHorizontal && [
              styles.DayPickerNavigation_button__horizontal,
              ...isDefaultNavPrev && [
                styles.DayPickerNavigation_button__horizontalDefault,
                !isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault,
                isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault,
              ],
            ]),
            ...(isVertical && [
              styles.DayPickerNavigation_button__vertical,
              ...isDefaultNavPrev && [
                styles.DayPickerNavigation_button__verticalDefault,
                styles.DayPickerNavigation_prevButton__verticalDefault,
              ],
            ]),
          )}
          type="button"
          aria-label={phrases.jumpToPrevMonth}
          onClick={onPrevMonthClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          {navPrevIcon}
        </button>
      )}

      <button
        {...css(
          styles.DayPickerNavigation_button,
          isDefaultNavNext && styles.DayPickerNavigation_button__default,
          ...(isHorizontal && [
            styles.DayPickerNavigation_button__horizontal,
            ...isDefaultNavNext && [
              styles.DayPickerNavigation_button__horizontalDefault,
              isRTL && styles.DayPickerNavigation_leftButton__horizontalDefault,
              !isRTL && styles.DayPickerNavigation_rightButton__horizontalDefault,
            ],
          ]),
          ...(isVertical && [
            styles.DayPickerNavigation_button__vertical,
            styles.DayPickerNavigation_nextButton__vertical,
            ...isDefaultNavNext && [
              styles.DayPickerNavigation_button__verticalDefault,
              styles.DayPickerNavigation_nextButton__verticalDefault,
              isVerticalScrollable &&
                styles.DayPickerNavigation_nextButton__verticalScrollableDefault,
            ],
          ]),
        )}
        type="button"
        aria-label={phrases.jumpToNextMonth}
        onClick={onNextMonthClick}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        {navNextIcon}
      </button>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, zIndex } }) => ({
  DayPickerNavigation: {
    position: 'relative',
    zIndex: zIndex + 2,
  },

  DayPickerNavigation__horizontal: {},
  DayPickerNavigation__vertical: {},
  DayPickerNavigation__verticalScrollable: {},

  DayPickerNavigation__verticalDefault: {
    position: 'absolute',
    width: '100%',
    height: 52,
    bottom: 0,
    left: 0,
  },

  DayPickerNavigation__verticalScrollableDefault: {
    position: 'relative',
  },

  DayPickerNavigation_button: {
    cursor: 'pointer',
    userSelect: 'none',
    border: 0,
    padding: 0,
    margin: 0,
  },

  DayPickerNavigation_button__default: {
    border: `1px solid ${color.core.borderLight}`,
    backgroundColor: color.background,
    color: color.placeholderText,

    ':focus': {
      border: `1px solid ${color.core.borderMedium}`,
    },

    ':hover': {
      border: `1px solid ${color.core.borderMedium}`,
    },

    ':active': {
      background: color.backgroundDark,
    },
  },

  DayPickerNavigation_button__horizontal: {
  },

  DayPickerNavigation_button__horizontalDefault: {
    position: 'absolute',
    top: 18,
    lineHeight: 0.78,
    borderRadius: 3,
    padding: '6px 9px',
  },

  DayPickerNavigation_leftButton__horizontalDefault: {
    left: 22,
  },

  DayPickerNavigation_rightButton__horizontalDefault: {
    right: 22,
  },

  DayPickerNavigation_button__vertical: {
  },

  DayPickerNavigation_button__verticalDefault: {
    padding: 5,
    background: color.background,
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    display: 'inline-block',
    height: '100%',
    width: '50%',
  },

  DayPickerNavigation_prevButton__verticalDefault: {
  },

  DayPickerNavigation_nextButton__verticalDefault: {
    borderLeft: 0,
  },

  DayPickerNavigation_nextButton__verticalScrollableDefault: {
    width: '100%',
  },

  DayPickerNavigation_svg__horizontal: {
    height: 19,
    width: 19,
    fill: color.core.grayLight,
  },

  DayPickerNavigation_svg__vertical: {
    height: 42,
    width: 42,
    fill: color.text,
  },
}))(DayPickerNavigation);
