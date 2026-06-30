'use client';

import { useState, useEffect, useRef } from 'react';
import './FollowEyes.css';

export default function FollowEyes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyeState, setEyeState] = useState('sleeping'); // sleeping, tracking, searching, tired
  const [searchTarget, setSearchTarget] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthShape, setMouthShape] = useState('closed'); // closed, neutral, searching1, searching2, searching3, yawning
  const [peekingEye, setPeekingEye] = useState(null); // null, 'left', 'right'
  const [isPeeking, setIsPeeking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const animationTimeoutRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const containerRef = useRef(null);
  const lastMouseMoveTime = useRef(Date.now());
  const searchInterval = useRef(null);
  const searchStartTime = useRef(null);
  const peekInterval = useRef(null);
  const peekSearchInterval = useRef(null);

  // Initialize theme from HTML element
  useEffect(() => {
    const htmlIsDark = document.documentElement.classList.contains('dark');
    setIsDark(htmlIsDark);
  }, []);

  // Handle theme toggle with complex animation
  const handleThemeToggle = (e) => {
    e.stopPropagation();

    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);

    // Animation sequence:
    // 1. Eyes grow and move to center (0-800ms)
    // 2. Floating animation (800-1300ms)
    // 3. Mouth closes (1300-1800ms)
    // 4. Theme switches - background changes (1500ms)
    // 5. Text/borders change (1800ms)
    // 6. Mouth opens (2000-2500ms)
    // 7. Eyes return to position (2500-3300ms)

    // Stage 1-2: Growth and floating handled by CSS

    // Stage 3: Close mouth and switch theme
    setTimeout(() => {
      setMouthShape('closed');
    }, 1300);

    // Stage 4: Switch theme (background changes first due to CSS transition delays)
    setTimeout(() => {
      document.documentElement.classList.toggle('dark');
      setIsDark(!isDark);
    }, 1500);

    // Stage 6: Open mouth
    setTimeout(() => {
      if (eyeState === 'tracking' || eyeState === 'searching') {
        setMouthShape('neutral');
      } else {
        setMouthShape('closed');
      }
    }, 2000);

    // Stage 7: End animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 3300);
  };

  // 8 direction positions relative to center
  const getSearchDirections = () => {
    if (!containerRef.current) return [];

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = 300;

    return [
      { x: centerX, y: centerY - distance, name: 'top' },
      { x: centerX, y: centerY + distance, name: 'bottom' },
      { x: centerX - distance, y: centerY, name: 'left' },
      { x: centerX + distance, y: centerY, name: 'right' },
      { x: centerX - distance, y: centerY - distance, name: 'top-left' },
      { x: centerX + distance, y: centerY - distance, name: 'top-right' },
      { x: centerX - distance, y: centerY + distance, name: 'bottom-left' },
      { x: centerX + distance, y: centerY + distance, name: 'bottom-right' },
    ];
  };

  // Mouse tracking with smooth interpolation
  useEffect(() => {
    let animationFrameId;
    // Initialize at center of screen for straight-ahead default
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let targetX = centerX;
    let targetY = centerY;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMouseMoveTime.current = Date.now();

      // Immediately stop all activities and track mouse
      if (eyeState !== 'tracking') {
        // Stop peeking if active
        if (isPeeking) {
          setIsPeeking(false);
          setPeekingEye(null);
          if (peekSearchInterval.current) {
            clearInterval(peekSearchInterval.current);
            peekSearchInterval.current = null;
          }
        }

        // Stop searching if active
        if (searchInterval.current) {
          clearInterval(searchInterval.current);
          searchInterval.current = null;
        }

        // Stop peek interval timer
        if (peekInterval.current) {
          clearTimeout(peekInterval.current);
          peekInterval.current = null;
        }

        // Wake up and track
        setEyeState('tracking');
      }
    };

    // Smooth lerp animation
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [eyeState]);

  // State management: tracking → searching (12s) → tired (3s) → sleeping = 15s total
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;

      if (timeSinceLastMove > 3000 && eyeState === 'tracking') {
        // 3 seconds: start searching
        setEyeState('searching');
        searchStartTime.current = Date.now();
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [eyeState]);

  // Random searching behavior in 8 directions for 9 seconds
  useEffect(() => {
    if (eyeState === 'searching') {
      const directions = getSearchDirections();
      let usedDirections = [];

      const search = () => {
        // Check if 9 seconds have passed (total 15s: 3s delay + 9s search + 3s tired)
        if (searchStartTime.current && Date.now() - searchStartTime.current > 9000) {
          setEyeState('tired');
          if (searchInterval.current) {
            clearInterval(searchInterval.current);
            searchInterval.current = null;
          }
          return;
        }

        // Blink before changing direction
        blink();

        // Cycle through mouth shapes while searching
        const searchShapes = ['searching1', 'searching2', 'searching3'];
        const currentShapeIndex = searchShapes.indexOf(mouthShape);
        const nextShape = searchShapes[(currentShapeIndex + 1) % searchShapes.length];
        setMouthShape(nextShape);

        // Wait for blink to complete before changing direction
        setTimeout(() => {
          // Reset if all directions used
          if (usedDirections.length === directions.length) {
            usedDirections = [];
          }

          // Get random unused direction
          const availableDirections = directions.filter(
            (_, index) => !usedDirections.includes(index)
          );
          const randomIndex = Math.floor(Math.random() * availableDirections.length);
          const selectedDirection = availableDirections[randomIndex];

          // Mark as used
          const originalIndex = directions.findIndex(d => d.name === selectedDirection.name);
          usedDirections.push(originalIndex);

          setSearchTarget(selectedDirection);
        }, 200); // Wait 200ms for blink (150ms blink + 50ms buffer)
      };

      // Initial search (no blink for first one)
      const initialDirections = getSearchDirections();
      if (initialDirections.length > 0) {
        setSearchTarget(initialDirections[0]);
      }

      // Search every 1.2 seconds (includes blink time)
      searchInterval.current = setInterval(search, 1200);

      return () => {
        if (searchInterval.current) {
          clearInterval(searchInterval.current);
          searchInterval.current = null;
        }
      };
    }
  }, [eyeState]);

  // Tired state - wait 3 seconds then sleep (total 15s)
  useEffect(() => {
    if (eyeState === 'tired') {
      setMouthShape('yawning'); // Show yawning mouth when tired
      const tiredTimer = setTimeout(() => {
        setEyeState('sleeping');
        setMouthShape('closed'); // Close mouth when sleeping
        setIsPeeking(false);
        setPeekingEye(null);
      }, 3000);

      return () => clearTimeout(tiredTimer);
    }
  }, [eyeState]);

  // Peeking behavior while sleeping - left eye opens to scout for mouse
  useEffect(() => {
    if (eyeState === 'sleeping' && !isPeeking) {
      // Exact 10 seconds interval before scouting
      peekInterval.current = setTimeout(() => {
        // Always use left eye for scouting
        setPeekingEye('left');
        setIsPeeking(true);

        // Start searching around for mouse with the peeking eye
        const directions = getSearchDirections();
        let dirIndex = 0;

        const peekSearch = () => {
          if (directions.length > 0) {
            setSearchTarget(directions[dirIndex % directions.length]);
            dirIndex++;
          }
        };

        // Initial search
        peekSearch();

        // Search every 0.625 seconds to cover all 8 directions in 5 seconds (8 directions * 0.625s = 5s)
        peekSearchInterval.current = setInterval(peekSearch, 625);

        // Duration of scouting: exactly 5 seconds
        setTimeout(() => {
          // Stop peeking and go back to sleep
          setIsPeeking(false);
          setPeekingEye(null);
          if (peekSearchInterval.current) {
            clearInterval(peekSearchInterval.current);
            peekSearchInterval.current = null;
          }
        }, 5000); // Exactly 5 seconds
      }, 10000); // Exactly 10 seconds

      return () => {
        if (peekInterval.current) {
          clearTimeout(peekInterval.current);
        }
        if (peekSearchInterval.current) {
          clearInterval(peekSearchInterval.current);
        }
      };
    }
  }, [eyeState, isPeeking]);

  // Update mouth based on eye state (initial state only)
  useEffect(() => {
    if (eyeState === 'sleeping') {
      setMouthShape('closed');
    } else if (eyeState === 'tracking') {
      setMouthShape('neutral');
    } else if (eyeState === 'searching' && mouthShape !== 'searching1' && mouthShape !== 'searching2' && mouthShape !== 'searching3') {
      setMouthShape('searching1'); // Set initial search shape only if not already in search mode
    }
  }, [eyeState, mouthShape]);

  // Blink function
  const blink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 150);
  };

  // Random blinking effect (only when awake)
  useEffect(() => {
    if (eyeState === 'sleeping' || eyeState === 'tired') return;

    // Different blink rates for tracking vs searching
    const getRandomBlinkDelay = () => {
      if (eyeState === 'searching') {
        return Math.random() * 1500 + 1000; // 1-2.5 seconds when searching
      }
      return Math.random() * 2000 + 3000; // 3-5 seconds when tracking
    };

    const initialBlink = setTimeout(blink, getRandomBlinkDelay());

    let blinkIntervalId;
    const scheduleNextBlink = () => {
      blinkIntervalId = setTimeout(() => {
        blink();
        scheduleNextBlink(); // Schedule next blink
      }, getRandomBlinkDelay());
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(initialBlink);
      clearTimeout(blinkIntervalId);
    };
  }, [eyeState]);

  // Calculate pupil position independently for each eye
  const calculatePupilPosition = (eyeRef, isLeft) => {
    if (!eyeRef.current || !containerRef.current) return { x: 0, y: 0 };

    // If sleeping but this eye is peeking, calculate position
    const isThisEyePeeking = isPeeking &&
      ((isLeft && peekingEye === 'left') || (!isLeft && peekingEye === 'right'));

    if (eyeState === 'sleeping' && !isThisEyePeeking) {
      return { x: 0, y: 0 }; // Pupils straight when sleeping (eyes closed anyway)
    }

    if (eyeState === 'tired' && !isThisEyePeeking) {
      return { x: 0, y: 8 }; // Pupils slightly down when tired
    }

    const eyeRect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    let targetX, targetY;

    // If peeking while sleeping, look at search targets
    if (isThisEyePeeking) {
      targetX = searchTarget.x;
      targetY = searchTarget.y;
    } else if (eyeState === 'searching') {
      // Both eyes look at same search target
      targetX = searchTarget.x;
      targetY = searchTarget.y;
    } else {
      // Track mouse independently
      targetX = mousePos.x;
      targetY = mousePos.y;
    }

    // Calculate angle from this specific eye to target
    const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);

    // Calculate distance
    const distance = Math.min(
      Math.hypot(targetX - eyeCenterX, targetY - eyeCenterY) / 30,
      1
    );

    // Check if mouse is between the two eyes
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const mouseIsInBetween =
      eyeState === 'tracking' &&
      Math.abs(mousePos.x - containerCenterX) < 50 &&
      Math.abs(mousePos.y - eyeCenterY) < 100;

    // If mouse is between eyes, make them look inward/closely (reduced for smaller eyes)
    let maxMove = 12;
    if (mouseIsInBetween) {
      maxMove = 15; // Increased movement for "close looking"
    }

    const moveX = Math.cos(angle) * distance * maxMove;
    const moveY = Math.sin(angle) * distance * maxMove;

    return { x: moveX, y: moveY };
  };

  const leftPupilPos = calculatePupilPosition(leftEyeRef, true);
  const rightPupilPos = calculatePupilPosition(rightEyeRef, false);

  // Determine if each eye should be sleeping
  const isLeftSleeping = eyeState === 'sleeping' && !(isPeeking && peekingEye === 'left');
  const isRightSleeping = eyeState === 'sleeping' && !(isPeeking && peekingEye === 'right');

  return (
    <>
      <div
        className={`follow-eyes-container ${isAnimating ? 'theme-switching' : ''}`}
        ref={containerRef}
        onClick={handleThemeToggle}
        style={{ cursor: 'pointer', pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        <div className="face">
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            className={`eye ${isLeftSleeping ? 'sleeping' : ''} ${eyeState === 'tired' ? 'tired' : ''} ${isBlinking ? 'blinking' : ''} ${isPeeking && peekingEye === 'left' ? 'peeking' : ''}`}
          >
            <div className="eye-black">
              <div
                className="pupil"
                style={{
                  transform: `translate(${leftPupilPos.x}px, ${leftPupilPos.y}px)`
                }}
              />
            </div>
            <div className="eyelid top" />
            <div className="eyelid bottom" />
          </div>

          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            className={`eye ${isRightSleeping ? 'sleeping' : ''} ${eyeState === 'tired' ? 'tired' : ''} ${isBlinking ? 'blinking' : ''} ${isPeeking && peekingEye === 'right' ? 'peeking' : ''}`}
          >
            <div className="eye-black">
              <div
                className="pupil"
                style={{
                  transform: `translate(${rightPupilPos.x}px, ${rightPupilPos.y}px)`
                }}
              />
            </div>
            <div className="eyelid top" />
            <div className="eyelid bottom" />
          </div>
        </div>

      </div>

      {/* Mouth */}
      <div className={`mouth ${mouthShape} ${isAnimating ? 'animating' : ''}`} />
    </>
  );
}
