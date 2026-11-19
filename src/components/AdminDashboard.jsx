import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { 
  LogOut, 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  ArrowLeft, 
  GraduationCap, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import LessonPlanViewer from './LessonPlanViewer';

const MONTH_ORDER = {
  'August': 1,
  'September': 2,
  'October': 3,
  'November': 4,
  'December': 5,
  'January': 6,
  'February': 7,
  'March': 8,
  'April': 9,
  'May': 10,
  'June': 11,
  'Emergency Plans': 99
};

const getPlanGrade = (plan) => {
  if (plan.grade_level) return plan.grade_level;
  const std = (plan.standard || '').trim();
  if (
    std.startsWith('7.') || 
    std.includes('7.EE') || 
    std.includes('7.RP') || 
    std.includes('7.NS') || 
    std.includes('7.G') || 
    std.includes('7.SP')
  ) {
    return '7th Grade';
  }
  const topic = (plan.topic || '');
  const week = (plan.week_label || '');
  if (
    week.includes('[G7]') || 
    week.includes('7th Grade') || 
    topic.includes('7th Grade') || 
    topic.includes('[Grade 7]')
  ) {
    return '7th Grade';
  }
  return '8th Grade';
};

const getMonthFromWeekLabel = (cleanWeek) => {
  if (cleanWeek.includes('Emergency')) return 'Emergency Plans';
  const firstMonthNum = parseInt(cleanWeek.split('/')[0], 10);
  const months = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[firstMonthNum] || 'Other';
};

const formatDayLabel = (plan) => {
  if (plan.week_label === 'Emergency Sub Plans') {
    return plan.topic || 'Emergency Plan';
  }
  if (!plan.date_start) return plan.topic || 'Plan';
  try {
    return format(parseISO(plan.date_start), 'EEEE (M/d)');
  } catch (e) {
    return plan.date_start;
  }
};

const AdminDashboard = ({ onLogout, pin, role, adminName }) => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedGradeView, setSelectedGradeView] = useState('8th Grade'); // '8th Grade' | '7th Grade' | 'All'
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Multi-level accordion expansion states
  const [expandedGrades, setExpandedGrades] = useState({ '8th Grade': true, '7th Grade': true });
  const [expandedMonths, setExpandedMonths] = useState({ '8th Grade_November': true, '7th Grade_November': true });
  const [expandedWeeks, setExpandedWeeks] = useState({ '8th Grade_11/16-11/20': true, '7th Grade_11/16-11/20': true });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from('lesson_plans')
      .select('*')
      .order('date_start', { ascending: true });
      
    if (!error && data) {
      setPlans(data);

      // Smart default: find plan for current day (11/19) or latest in active week
      const eighthGradePlans = data.filter(p => getPlanGrade(p) === '8th Grade');
      const todayEighthPlan = eighthGradePlans.find(p => p.date_start === '2026-11-19') || 
                              eighthGradePlans.find(p => (p.week_label || '').includes('11/16-11/20')) ||
                              eighthGradePlans[0];

      if (todayEighthPlan) {
        setSelectedPlan(todayEighthPlan);
      }
    }
  };

  // Group plans into Grade -> Month -> Week -> Days[]
  const hierarchy = useMemo(() => {
    const data = {
      '8th Grade': {},
      '7th Grade': {}
    };

    plans.forEach(plan => {
      const grade = getPlanGrade(plan);
      const cleanWeek = (plan.week_label || 'Other Plans').replace(/[G7]\s*/g, '');
      const month = getMonthFromWeekLabel(cleanWeek);

      if (!data[grade][month]) data[grade][month] = {};
      if (!data[grade][month][cleanWeek]) data[grade][month][cleanWeek] = [];
      data[grade][month][cleanWeek].push(plan);
    });

    return data;
  }, [plans]);

  // Map of plans by week for LessonPlanViewer presentation/framing
  const plansByWeekMap = useMemo(() => {
    const map = {};
    plans.forEach(plan => {
      const grade = getPlanGrade(plan);
      const cleanWeek = (plan.week_label || 'Other Plans').replace(/[G7]\s*/g, '');
      const key = `${grade}_${cleanWeek}`;
      if (!map[key]) map[key] = [];
      map[key].push(plan);
    });
    return map;
  }, [plans]);

  const currentWeekPlans = useMemo(() => {
    if (!selectedPlan) return [];
    const grade = getPlanGrade(selectedPlan);
    const cleanWeek = (selectedPlan.week_label || '').replace(/[G7]\s*/g, '');
    return plansByWeekMap[`${grade}_${cleanWeek}`] || [];
  }, [selectedPlan, plansByWeekMap]);

  // Counts
  const eighthGradeCount = useMemo(() => {
    return plans.filter(p => getPlanGrade(p) === '8th Grade').length;
  }, [plans]);

  const seventhGradeCount = useMemo(() => {
    return plans.filter(p => getPlanGrade(p) === '7th Grade').length;
  }, [plans]);

  // Toggle handlers
  const toggleGrade = (grade) => {
    setExpandedGrades(prev => ({ ...prev, [grade]: !prev[grade] }));
  };

  const toggleMonth = (grade, month) => {
    const key = `${grade}_${month}`;
    setExpandedMonths(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWeek = (grade, week) => {
    const key = `${grade}_${week}`;
    setExpandedWeeks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Grade selection switch
  const handleSelectGradeView = (view) => {
    setSelectedGradeView(view);
    if (view === '7th Grade') {
      const seventhGradePlans = plans.filter(p => getPlanGrade(p) === '7th Grade');
      const todaySeventh = seventhGradePlans.find(p => p.date_start === '2026-11-19') || seventhGradePlans[0];
      if (todaySeventh) {
        setSelectedPlan(todaySeventh);
        setExpandedMonths(prev => ({ ...prev, '7th Grade_November': true }));
        setExpandedWeeks(prev => ({ ...prev, '7th Grade_11/16-11/20': true }));
      }
    } else if (view === '8th Grade') {
      const eighthGradePlans = plans.filter(p => getPlanGrade(p) === '8th Grade');
      const todayEighth = eighthGradePlans.find(p => p.date_start === '2026-11-19') || eighthGradePlans[0];
      if (todayEighth) {
        setSelectedPlan(todayEighth);
        setExpandedMonths(prev => ({ ...prev, '8th Grade_November': true }));
        setExpandedWeeks(prev => ({ ...prev, '8th Grade_11/16-11/20': true }));
      }
    }
  };

  const gradesToRender = useMemo(() => {
    if (selectedGradeView === 'All') return ['8th Grade', '7th Grade'];
    return [selectedGradeView];
  }, [selectedGradeView]);

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0' }}>{adminName ? `Welcome, ${adminName}` : 'Admin / Viewer Dashboard'}</h2>
          {adminName && <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Admin / Viewer Dashboard</p>}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {role === 'teacher' && (
            <button onClick={() => navigate('/teacher')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #008080, #004c4c)' }}>
              <ArrowLeft size={18} /> Back to Teacher View
            </button>
          )}
          <button onClick={onLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar & Lesson Plan Viewer */}
      <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Deep Accordion Sidebar */}
        <div className="glass" style={{ padding: '14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)' }}>
          
          {/* Grade Level Toggle Buttons (8th Grade | 7th Grade | All Grades) */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(0, 128, 128, 0.08)', 
            borderRadius: '12px', 
            padding: '4px', 
            marginBottom: '16px',
            border: '1px solid rgba(0, 128, 128, 0.15)',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => handleSelectGradeView('8th Grade')}
              style={{
                flex: 1.2,
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: selectedGradeView === '8th Grade' ? '700' : '600',
                fontSize: '12.5px',
                cursor: 'pointer',
                background: selectedGradeView === '8th Grade' ? 'linear-gradient(135deg, #008080, #004c4c)' : 'transparent',
                color: selectedGradeView === '8th Grade' ? '#ffffff' : '#4a5568',
                boxShadow: selectedGradeView === '8th Grade' ? '0 2px 6px rgba(0, 128, 128, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <GraduationCap size={15} />
              8th Grade
              <span style={{ fontSize: '10px', opacity: 0.85 }}>({eighthGradeCount})</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectGradeView('7th Grade')}
              style={{
                flex: 1.2,
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: selectedGradeView === '7th Grade' ? '700' : '600',
                fontSize: '12.5px',
                cursor: 'pointer',
                background: selectedGradeView === '7th Grade' ? 'linear-gradient(135deg, #008080, #004c4c)' : 'transparent',
                color: selectedGradeView === '7th Grade' ? '#ffffff' : '#4a5568',
                boxShadow: selectedGradeView === '7th Grade' ? '0 2px 6px rgba(0, 128, 128, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <GraduationCap size={15} />
              7th Grade
              <span style={{ fontSize: '10px', opacity: 0.85 }}>({seventhGradeCount})</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectGradeView('All')}
              style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: selectedGradeView === 'All' ? '700' : '600',
                fontSize: '12px',
                cursor: 'pointer',
                background: selectedGradeView === 'All' ? 'linear-gradient(135deg, #008080, #004c4c)' : 'transparent',
                color: selectedGradeView === 'All' ? '#ffffff' : '#4a5568',
                boxShadow: selectedGradeView === 'All' ? '0 2px 6px rgba(0, 128, 128, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Layers size={13} />
              All
              <span style={{ fontSize: '10px', opacity: 0.85 }}>({plans.length})</span>
            </button>
          </div>

          {/* Hierarchy: Grade -> Month -> Week -> Day */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {gradesToRender.map(grade => {
              const monthsObj = hierarchy[grade] || {};
              const sortedMonths = Object.keys(monthsObj).sort((a, b) => (MONTH_ORDER[a] || 50) - (MONTH_ORDER[b] || 50));
              const isGradeExpanded = expandedGrades[grade] !== false;
              const totalGradePlans = sortedMonths.reduce((sum, m) => {
                return sum + Object.values(monthsObj[m]).reduce((wSum, w) => wSum + w.length, 0);
              }, 0);

              return (
                <div key={grade} style={{ 
                  borderRadius: '10px', 
                  border: '1px solid rgba(75, 0, 130, 0.15)',
                  background: 'rgba(255, 255, 255, 0.7)',
                  overflow: 'hidden'
                }}>
                  
                  {/* Grade Level Header (collapsible in All mode) */}
                  <div 
                    onClick={() => toggleGrade(grade)}
                    style={{
                      background: 'linear-gradient(135deg, #300052, #4b0082)',
                      color: '#ffffff',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <GraduationCap size={18} color="#20b2aa" />
                      <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
                        {grade} Mathematics
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: '600', 
                        background: 'rgba(255,255,255,0.18)', 
                        padding: '2px 8px', 
                        borderRadius: '10px' 
                      }}>
                        {totalGradePlans} Plans
                      </span>
                      {isGradeExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </div>

                  {/* Months Accordion List */}
                  {isGradeExpanded && (
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sortedMonths.length === 0 && (
                        <p style={{ padding: '10px', color: '#666', fontSize: '13px', margin: 0 }}>
                          No lesson plans found for {grade}.
                        </p>
                      )}

                      {sortedMonths.map(month => {
                        const monthKey = `${grade}_${month}`;
                        const isMonthExpanded = expandedMonths[monthKey] !== false;
                        const weeksObj = monthsObj[month];
                        const sortedWeeks = Object.keys(weeksObj).sort((wA, wB) => {
                          const dateA = weeksObj[wA][0]?.date_start || '9999';
                          const dateB = weeksObj[wB][0]?.date_start || '9999';
                          return dateA.localeCompare(dateB);
                        });
                        const totalMonthPlans = sortedWeeks.reduce((sum, w) => sum + weeksObj[w].length, 0);

                        return (
                          <div 
                            key={monthKey} 
                            style={{ 
                              borderRadius: '8px', 
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              overflow: 'hidden',
                              background: '#ffffff'
                            }}
                          >
                            {/* Month Header */}
                            <div 
                              onClick={() => toggleMonth(grade, month)}
                              style={{
                                background: isMonthExpanded ? 'linear-gradient(135deg, #4b0082, #6a0dad)' : '#f8f9fa',
                                color: isMonthExpanded ? '#ffffff' : '#2d3748',
                                padding: '9px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                                borderBottom: isMonthExpanded ? '1px solid rgba(0,0,0,0.1)' : 'none'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                <Calendar size={15} color={isMonthExpanded ? '#20b2aa' : '#008080'} />
                                <span style={{ fontWeight: '700', fontSize: '13px' }}>
                                  {month}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ 
                                  fontSize: '10.5px', 
                                  fontWeight: '600', 
                                  background: isMonthExpanded ? 'rgba(255,255,255,0.2)' : 'rgba(0,128,128,0.1)', 
                                  color: isMonthExpanded ? '#ffffff' : '#008080',
                                  padding: '1px 6px', 
                                  borderRadius: '8px' 
                                }}>
                                  {sortedWeeks.length} Wks ({totalMonthPlans}d)
                                </span>
                                {isMonthExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                              </div>
                            </div>

                            {/* Weeks List */}
                            {isMonthExpanded && (
                              <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '6px', background: '#fafbfc' }}>
                                {sortedWeeks.map(week => {
                                  const weekKey = `${grade}_${week}`;
                                  const isWeekExpanded = expandedWeeks[weekKey] !== false;
                                  const days = weeksObj[week];

                                  return (
                                    <div 
                                      key={weekKey}
                                      style={{
                                        borderRadius: '6px',
                                        border: '1px solid rgba(0, 128, 128, 0.18)',
                                        background: '#ffffff',
                                        overflow: 'hidden'
                                      }}
                                    >
                                      {/* Week Header */}
                                      <div
                                        onClick={() => toggleWeek(grade, week)}
                                        style={{
                                          padding: '7px 10px',
                                          background: isWeekExpanded ? 'rgba(0, 128, 128, 0.1)' : '#ffffff',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          borderBottom: isWeekExpanded ? '1px solid rgba(0, 128, 128, 0.12)' : 'none',
                                          transition: 'background 0.15s ease'
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <Clock size={13} color="#008080" />
                                          <span style={{ fontWeight: '600', fontSize: '12px', color: '#1a202c' }}>
                                            {week === 'Emergency Sub Plans' ? 'Emergency Sub Plans' : `Week ${week}`}
                                          </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <span style={{ 
                                            fontSize: '10px', 
                                            fontWeight: '600', 
                                            background: 'rgba(0, 128, 128, 0.12)', 
                                            color: '#004c4c',
                                            padding: '1px 5px', 
                                            borderRadius: '6px' 
                                          }}>
                                            {days.length}d
                                          </span>
                                          {isWeekExpanded ? <ChevronDown size={14} color="#4a5568" /> : <ChevronRight size={14} color="#4a5568" />}
                                        </div>
                                      </div>

                                      {/* Days Button List */}
                                      {isWeekExpanded && (
                                        <div style={{ padding: '4px' }}>
                                          {days.map(plan => {
                                            const isSelected = selectedPlan?.id === plan.id;
                                            return (
                                              <button
                                                key={plan.id}
                                                onClick={() => setSelectedPlan(plan)}
                                                style={{
                                                  width: '100%',
                                                  textAlign: 'left',
                                                  padding: '7px 10px',
                                                  marginBottom: '3px',
                                                  borderRadius: '5px',
                                                  background: isSelected ? 'rgba(0, 128, 128, 0.14)' : 'transparent',
                                                  border: 'none',
                                                  borderLeft: isSelected ? '3.5px solid #008080' : '3.5px solid transparent',
                                                  cursor: 'pointer',
                                                  transition: 'all 0.15s ease',
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  gap: '2px'
                                                }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                  <span style={{ 
                                                    fontWeight: isSelected ? '700' : '600', 
                                                    fontSize: '12px',
                                                    color: isSelected ? '#004c4c' : '#2d3748' 
                                                  }}>
                                                    {formatDayLabel(plan)}
                                                  </span>
                                                  {plan.standard && (
                                                    <span style={{ 
                                                      fontSize: '9.5px', 
                                                      background: isSelected ? '#008080' : 'rgba(0,0,0,0.06)', 
                                                      color: isSelected ? '#ffffff' : '#4a5568',
                                                      fontWeight: '600',
                                                      padding: '1px 4px', 
                                                      borderRadius: '4px' 
                                                    }}>
                                                      {plan.standard.split(',')[0]}
                                                    </span>
                                                  )}
                                                </div>
                                                <span style={{ 
                                                  fontSize: '11px', 
                                                  color: isSelected ? '#1a202c' : '#718096',
                                                  whiteSpace: 'nowrap',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  width: '100%'
                                                }}>
                                                  {plan.topic || 'No Topic'}
                                                </span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}

                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Lesson Plan Viewer */}
        <div className="glass" style={{ padding: '20px', minWidth: 0, overflow: 'hidden' }}>
          {selectedPlan ? (
            <LessonPlanViewer 
              plan={selectedPlan} 
              weekPlans={currentWeekPlans} 
              viewerPin={pin} 
              adminName={adminName} 
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>Select a date from the sidebar to view the lesson plan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
