'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var RNSlider = _interopDefault(require('react-native-slider'));

var containerBackgroundColor = "rgba(45, 59, 62, 0.0)";
var playButtonBorderColor = "rgba(255,255,255,0.0)";
var white = "#fff";
var styles = /*#__PURE__*/reactNative.StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center"
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20
  },
  playButton: {
    alignItems: "center",
    borderColor: playButtonBorderColor,
    borderRadius: 50,
    borderWidth: 0,
    height: 50,
    justifyContent: "center",
    width: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22
  },
  progressColumnContainer: {
    flex: 1
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -25
  },
  progressSlider: {
    alignSelf: "stretch"
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20
  },
  timeRow: {
    alignSelf: "stretch"
  },
  timerLabel: {
    color: white,
    fontSize: 12,
    fontFamily: "Muli"
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  track: {
    borderRadius: 1,
    height: 2
  }
});

(function (PLAYER_STATES) {
  PLAYER_STATES[PLAYER_STATES["PLAYING"] = 0] = "PLAYING";
  PLAYER_STATES[PLAYER_STATES["PAUSED"] = 1] = "PAUSED";
  PLAYER_STATES[PLAYER_STATES["ENDED"] = 2] = "ENDED";
})(exports.PLAYER_STATES || (exports.PLAYER_STATES = {}));

var images = {
  playIcon: /*#__PURE__*/require("./assets/ic_play.png"),
  pauseIcon: /*#__PURE__*/require("./assets/ic_pause.png"),
  replayIcon: /*#__PURE__*/require("./assets/ic_replay.png")
};

var Controls = function Controls(props) {
  var isLoading = props.isLoading,
      mainColor = props.mainColor,
      playerState = props.playerState,
      onReplay = props.onReplay,
      onPause = props.onPause;
  var pressAction = playerState === exports.PLAYER_STATES.ENDED ? onReplay : onPause;
  var replayIcon = images.replayIcon;

  var icon = function icon() {
    switch (playerState) {
      case exports.PLAYER_STATES.PAUSED:
        return images.playIcon;

      case exports.PLAYER_STATES.PLAYING:
        return images.pauseIcon;

      case exports.PLAYER_STATES.ENDED:
        return replayIcon;

      default:
        return images.playIcon;
    }
  };

  var content = isLoading ? React__default.createElement(reactNative.ActivityIndicator, {
    size: "large",
    color: "#FFF"
  }) : React__default.createElement(reactNative.TouchableOpacity, {
    style: [styles.playButton, {
      backgroundColor: mainColor
    }],
    onPress: pressAction,
    activeOpacity: 0
  }, React__default.createElement(reactNative.Image, {
    source: icon(),
    style: styles.playIcon
  }));
  return React__default.createElement(reactNative.View, {
    style: [styles.controlsRow]
  }, content);
};

var humanizeVideoDuration = function humanizeVideoDuration(seconds) {
  var _ref = seconds >= 3600 ? [11, 8] : [14, 5],
      begin = _ref[0],
      end = _ref[1];

  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};

var fullScreenImage = /*#__PURE__*/require("./assets/ic_fullscreen.png");

var Slider = function Slider(props) {
  var customSliderStyle = props.customSliderStyle,
      duration = props.duration,
      mainColor = props.mainColor,
      onFullScreen = props.onFullScreen,
      onPause = props.onPause,
      progress = props.progress;
  var containerStyle = (customSliderStyle == null ? void 0 : customSliderStyle.containerStyle) || {};
  var customTrackStyle = (customSliderStyle == null ? void 0 : customSliderStyle.trackStyle) || {};
  var customThumbStyle = (customSliderStyle == null ? void 0 : customSliderStyle.thumbStyle) || {};

  var dragging = function dragging(value) {
    var onSeeking = props.onSeeking,
        playerState = props.playerState;
    onSeeking(value);

    if (playerState === exports.PLAYER_STATES.PAUSED) {
      return;
    }

    onPause();
  };

  var seekVideo = function seekVideo(value) {
    props.onSeek(value);
    onPause();
  };

  return React__default.createElement(reactNative.View, {
    style: [styles.controlsRow, styles.progressContainer, containerStyle]
  }, React__default.createElement(reactNative.View, {
    style: styles.progressColumnContainer
  }, React__default.createElement(reactNative.View, {
    style: [styles.timerLabelsContainer]
  }, React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(progress)), React__default.createElement(reactNative.Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(duration))), React__default.createElement(RNSlider, {
    style: [styles.progressSlider],
    onValueChange: dragging,
    onSlidingComplete: seekVideo,
    maximumValue: Math.floor(duration),
    value: Math.floor(progress),
    trackStyle: [styles.track, customTrackStyle],
    thumbStyle: [styles.thumb, customThumbStyle, {
      borderColor: mainColor
    }],
    minimumTrackTintColor: mainColor
  })), Boolean(onFullScreen) && React__default.createElement(reactNative.TouchableOpacity, {
    style: styles.fullScreenContainer,
    onPress: onFullScreen
  }, React__default.createElement(reactNative.Image, {
    source: fullScreenImage
  })));
};

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, children);
};

var MediaControls = function MediaControls(props) {
  var children = props.children,
      _props$containerStyle = props.containerStyle,
      customContainerStyle = _props$containerStyle === void 0 ? {} : _props$containerStyle,
      duration = props.duration,
      _props$fadeOutDelay = props.fadeOutDelay,
      fadeOutDelay = _props$fadeOutDelay === void 0 ? 5000 : _props$fadeOutDelay,
      _props$isLoading = props.isLoading,
      isLoading = _props$isLoading === void 0 ? false : _props$isLoading,
      _props$mainColor = props.mainColor,
      mainColor = _props$mainColor === void 0 ? "rgba(12, 83, 175, 0.9)" : _props$mainColor,
      onFullScreen = props.onFullScreen,
      onReplayCallback = props.onReplay,
      onSeek = props.onSeek,
      onSeeking = props.onSeeking,
      playerState = props.playerState,
      progress = props.progress,
      _props$showOnStart = props.showOnStart,
      showOnStart = _props$showOnStart === void 0 ? true : _props$showOnStart,
      sliderStyle = props.sliderStyle,
      _props$toolbarStyle = props.toolbarStyle,
      customToolbarStyle = _props$toolbarStyle === void 0 ? {} : _props$toolbarStyle;

  var _ref = function () {
    if (showOnStart) {
      return {
        initialOpacity: 1,
        initialIsVisible: true
      };
    }

    return {
      initialOpacity: 0,
      initialIsVisible: false
    };
  }(),
      initialOpacity = _ref.initialOpacity,
      initialIsVisible = _ref.initialIsVisible;

  var _useState = React.useState(new reactNative.Animated.Value(initialOpacity)),
      opacity = _useState[0];

  var _useState2 = React.useState(initialIsVisible),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var fadeOutControls = function fadeOutControls(delay) {
    if (delay === void 0) {
      delay = 0;
    }

    reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay: delay,
      useNativeDriver: false
    }).start(function (result) {
      /* I noticed that the callback is called twice, when it is invoked and when it completely finished
      This prevents some flickering */
      if (result.finished) {
        setIsVisible(false);
      }
    });
  };

  var fadeInControls = function fadeInControls(loop) {
    if (loop === void 0) {
      loop = true;
    }

    setIsVisible(true);
    reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false
    }).start(function () {
      if (loop) {
        fadeOutControls(fadeOutDelay);
      }
    });
  };

  var onReplay = function onReplay() {
    fadeOutControls(fadeOutDelay);
    onReplayCallback();
  };

  var cancelAnimation = function cancelAnimation() {
    return opacity.stopAnimation(function () {
      return setIsVisible(true);
    });
  };

  var onPause = function onPause() {
    var playerState = props.playerState,
        onPaused = props.onPaused;
    var PLAYING = exports.PLAYER_STATES.PLAYING,
        PAUSED = exports.PLAYER_STATES.PAUSED;

    switch (playerState) {
      case PLAYING:
        {
          cancelAnimation();
          break;
        }

      case PAUSED:
        {
          fadeOutControls(fadeOutDelay);
          break;
        }
    }

    var newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  var toggleControls = function toggleControls() {
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    opacity.stopAnimation(function (value) {
      setIsVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  return React__default.createElement(reactNative.TouchableWithoutFeedback, {
    onPress: toggleControls
  }, React__default.createElement(reactNative.Animated.View, {
    style: [styles.container, {
      opacity: opacity
    }]
  }, isVisible && React__default.createElement(reactNative.View, {
    style: [styles.container, customContainerStyle]
  }, React__default.createElement(reactNative.View, {
    style: [styles.controlsRow, styles.toolbarRow, customToolbarStyle]
  }, children), React__default.createElement(Controls, {
    onPause: onPause,
    onReplay: onReplay,
    isLoading: isLoading,
    mainColor: "#FFFFFF",
    playerState: playerState
  }), React__default.createElement(Slider, {
    progress: progress,
    duration: duration,
    mainColor: mainColor,
    onFullScreen: onFullScreen,
    playerState: playerState,
    onSeek: onSeek,
    onSeeking: onSeeking,
    onPause: onPause,
    customSliderStyle: sliderStyle
  }))));
};

MediaControls.Toolbar = Toolbar;

exports.default = MediaControls;
//# sourceMappingURL=react-native-media-controls.cjs.development.js.map
