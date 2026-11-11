module.exports = {
  cttn_ccpfsb: {
    ccp_speed_cv: {
      node:'ns=2;s=PLC_FSB.Baking.ccp_speed',
      decimal: 0.01,
      column: 'ccp_speed_cv'
    },
    ccp_Temp_Z1_Down: {
      node:'ns=2;s=PLC_FSB.Baking.temp_Z1_down',
      decimal: 0.1,
      column: 'ccp_Temp_Z1_Down'
    },
    ccp_Temp_Z1_Up: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z1_up',
      decimal: 0.1,
      column: 'ccp_Temp_Z1_Up',
    },
    output_mon_z1_down: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z1_down',
      decimal: 1,
      column: 'output_mon_z1_down'
    },
    output_mon_z1_up: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z1_up',
      decimal: 1,
      column: 'output_mon_z1_up'
    },
    output_mon_z2_down: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z2_down',
      decimal: 1,
      column: 'output_mon_z2_down'
    },
    output_mon_z2_up: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z2_up',
      decimal: 1,
      column: 'output_mon_z2_up'
    },
    output_mon_z3_down: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z3_down',
      decimal: 1,
      column: 'output_mon_z3_down'
    },
    output_mon_z3_up: {
      node:'ns=2;s=PLC_FSB.Baking.output_mon_z3_up',
      decimal: 1,
      column: 'output_mon_z3_up'
    }
  },
  cttn_baking_cooling_fsb: {
    Receipe_no: {
      node:'ns=2;s=PLC_FSB.Baking.Receipe_no',
      decimal: 1,
      column: 'Receipe_no'
    },
    baking_status: {
      node:'ns=2;s=PLC_FSB.Baking.baking_status',
      decimal: 1,
      column: 'baking_status'
    },
    receipe_txt: {
      node: 'ns=2;s=PLC_FSB.Baking.receipe_txt',
      decimal: 1,
      column: 'receipe_txt',
    },
    steam_flow_miura: {
      node: 'ns=2;s=PLC_FSB.Baking.steam_flow_miura',
      decimal: 1,
      column: 'steam_flow_miura',
    },
    steam_heatplus2: {
      node: 'ns=2;s=PLC_FSB.Baking.steam_heatplus2',
      decimal: 1,
      column: 'steam_heatplus2',
    },
    steam_press_hp2: {
      node: 'ns=2;s=PLC_FSB.Baking.steam_press_hp2',
      decimal: 1,
      column: 'steam_press_hp2',
    },
    temp_Z1_down: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z1_down',
      decimal: 0.1,
      column: 'temp_Z1_down',
    },
    temp_Z1_up: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z1_up',
      decimal: 0.1,
      column: 'temp_Z1_up',
    },
    temp_Z2_down: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z2_down',
      decimal: 0.1,
      column: 'temp_Z2_down',
    },
    temp_Z2_up: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z2_up',
      decimal: 0.1,
      column: 'temp_Z2_up',
    },
    temp_Z3_down: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z3_down',
      decimal: 0.1,
      column: 'temp_Z3_down',
    },
    temp_Z3_up: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_Z3_up',
      decimal: 0.1,
      column: 'temp_Z3_up',
    },
    temp_cooling_room: {
      node: 'ns=2;s=PLC_FSB.Baking.temp_cooling_room',
      decimal: 1,
      column: 'temp_cooling_room',
    },
    accum_percent: {
      node: 'ns=2;s=PLC_FSB.Cooling.accum_percent',
      decimal: 1,
      column: 'accum_percent',
    },
    display_output: {
      node: 'ns=2;s=PLC_FSB.Cooling.display_output',
      decimal: 1,
      column: 'display_output',
    },
    status_normal_op: {
      node: 'ns=2;s=PLC_FSB.Cooling.status_normal_op',
      decimal: 1,
      column: 'status_normal_op',
    },
    status_output: {
      node: 'ns=2;s=PLC_FSB.Cooling.status_normal_op',
      decimal: 1,
      column: 'status_output',
    },
    press_miura: {
      node: 'ns=2;s=PLC_FSB.Cooling.press_miura',
      decimal: 0.001,
      column: 'press_miura',
    },
    suhu_miura: {
      node: 'ns=2;s=PLC_FSB.Cooling.suhu_miura',
      decimal: 0.1,
      column: 'suhu_miura',
    },
    Low_Fr1_Ig_Fault: {
      node:'ns=2;s=PLC_FSB.Baking.Low_Fr11_Ig_Fault',
      decimal: 'string',
      column: 'Low_Fr1_Ig_Fault'
    },
    Upp_Fr1_Ig_Fault: {
      node:'ns=2;s=PLC_FSB.Baking.Upp_Fr1_Ig_Fault',
      decimal: 'string',
      column: 'Upp_Fr1_Ig_Fault'
    },
    cooling_time: {
      node:'ns=2;s=PLC_FSB.Cooling.Cooling_time',
      decimal: 1,
      column: 'cooling_time'
    },
    count_op_pusher: {
      node:'ns=2;s=PLC_FSB.Cooling.count_op_pusher',
      decimal: 1,
      column: 'count_op_pusher'
    },
    count_op_reject_gate: {
      node:'ns=2;s=PLC_FSB.Cooling.count_op_reject_gate',
      decimal: 1,
      column: 'count_op_reject_gate'
    },
    count_op_stopper: {
      node:'ns=2;s=PLC_FSB.Cooling.count_op_stopper',
      decimal: 1,
      column: 'count_op_stopper'
    },
    pusherpull_close: {
      node:'ns=2;s=PLC_FSB.Cooling.pusherpull_close',
      decimal: 1,
      column: 'pusherpull_close'
    },
    pusherpush_open: {
      node:'ns=2;s=PLC_FSB.Cooling.pusherpush_open',
      decimal: 1,
      column: 'pusherpush_open'
    },
    rejectgateclose: {
      node:'ns=2;s=PLC_FSB.Cooling.rejectgateclose',
      decimal: 1,
      column: 'rejectgateclose'
    },
    rejectgateopen: {
      node:'ns=2;s=PLC_FSB.Cooling.rejectgateopen',
      decimal: 1,
      column: 'rejectgateopen'
    },
    stopperclose: {
      node:'ns=2;s=PLC_FSB.Cooling.stopperclose',
      decimal: 1,
      column: 'stopperclose'
    },
    stopperopen: {
      node:'ns=2;s=PLC_FSB.Cooling.stopperopen',
      decimal: 1,
      column: 'stopperopen'
    },
    Ampere_FR_1: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.Ampere_FR_1',
      decimal: 0.01,
      column: 'Ampere_FR_1'
    },
    Ampere_FR_2: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.Ampere_FR_2',
      decimal: 0.01,
      column: 'Ampere_FR_2'
    },
    Ampere_FR_3: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.Ampere_FR_3',
      decimal: 0.01,
      column: 'Ampere_FR_3'
    },
    Ampere_FR_4: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.Ampere_FR_4',
      decimal: 0.01,
      column: 'Ampere_FR_4'
    },
    frequency_FR_1: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.frequency_FR_1',
      decimal: 0.01,
      column: 'frequency_FR_1'
    },
    frequency_FR_2: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.frequency_FR_2',
      decimal: 0.01,
      column: 'frequency_FR_2'
    },
    frequency_FR_3: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.frequency_FR_3',
      decimal: 0.01,
      column: 'frequency_FR_3'
    },
    frequency_FR_4: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.frequency_FR_4',
      decimal: 0.01,
      column: 'frequency_FR_4'
    },
    device_error_fr4: {
      node:'ns=2;s=ModbusTCP.FSB_eccu_baking.device_error_fr4',
      decimal: 1,
      column: 'device_error_fr4'
    }
  },
  cttn_forming_fsb: {
    sp_speed_ferry_cv: {
      node:'ns=2;s=PLC_FSB.Forming.sp_speed_ferry_cv',
      decimal: 0.1,
      column: 'sp_speed_ferry_cv'
    },
    sp_speed_makeup_table: {
      node:'ns=2;s=PLC_FSB.Forming.sp_speed_makeup_table',
      decimal: 0.1,
      column: 'sp_speed_makeup_table'
    },
    sp_speed_oven_ferry: {
      node: 'ns=2;s=PLC_FSB.Forming.sp_speed_oven_ferry',
      decimal: 0.1,
      column: 'sp_speed_oven_ferry',
    },
    sp_speed_screw_center: {
      node: 'ns=2;s=PLC_FSB.Forming.sp_speed_screw_center',
      decimal: 0.1,
      column: 'sp_speed_screw_center',
    },
    sp_speed_screw_inside: {
      node: 'ns=2;s=PLC_FSB.Forming.sp_speed_screw_inside',
      decimal: 0.1,
      column: 'sp_speed_screw_inside',
    },
    sp_speed_screw_near: {
      node: 'ns=2;s=PLC_FSB.Forming.sp_speed_screw_near',
      decimal: 0.1,
      column: 'sp_speed_screw_near',
    },
    speed_Extruder: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_Extruder',
      decimal: 0.1,
      column: 'speed_Extruder',
    },
    speed_ditch_roller: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_ditch_roller',
      decimal: 0.1,
      column: 'speed_ditch_roller',
    },
    speed_ferry_cv: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_ferry_cv',
      decimal: 0.1,
      column: 'speed_ferry_cv',
    },
    speed_flow_control: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_flow_control',
      decimal: 0.1,
      column: 'speed_flow_control',
    },
    speed_makeup_table: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_makeup_table',
      decimal: 0.1,
      column: 'speed_makeup_table',
    },
    speed_oven_ferry: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_oven_ferry',
      decimal: 0.1,
      column: 'speed_oven_ferry',
    },
    speed_scrapt_cv: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_scrapt_cv',
      decimal: 0.1,
      column: 'speed_scrapt_cv',
    },
    speed_scrapt_sv: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_scrapt_sv',
      decimal: 0.1,
      column: 'speed_scrapt_sv',
    },
    speed_screw_center: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_screw_center',
      decimal: 0.1,
      column: 'speed_screw_center',
    },
    speed_screw_inside: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_screw_inside',
      decimal: 0.1,
      column: 'speed_screw_inside',
    },
    speed_screw_near: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_screw_near',
      decimal: 0.1,
      column: 'speed_screw_near',
    },
    speed_underneath_cv: {
      node: 'ns=2;s=PLC_FSB.Forming.speed_underneath_cv',
      decimal: 0.1,
      column: 'speed_underneath_cv',
    },
    bar_before_backing: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.bar_before_backing',
      decimal: 1,
      column: 'bar_before_backing',
    },
    RH_Mixing: {
      node: 'ns=2;s=ModbusTCP.FSB_RH_Mixing.RH',
      decimal: 1,
      column: 'RH_Mixing',
    },
    runingminute_cutting: {
      node: 'ns=2;s=PLC_FSB.Forming.runingminute_cutting',
      decimal: 1,
      column: 'runingminute_cutting',
    },
    runninghours_cutting: {
      node: 'ns=2;s=PLC_FSB.Forming.runninghours_cutting',
      decimal: 1,
      column: 'runninghours_cutting',
    }
  },
  cttn_pillow_fsb: {
    CNT_bar: {
      node:'ns=2;s=PLC_FSB.Pillow.CNT_bar',
      decimal: 1,
      column: 'CNT_bar'
    },
    Delay_status: {
      node:'ns=2;s=PLC_FSB.Pillow.Delay_status',
      decimal: 1,
      column: 'Delay_status'
    },
    accum_percent: {
      node: 'ns=2;s=PLC_FSB.Pillow.accum_percent',
      decimal: 1,
      column: 'accum_percent',
    },
    bypass_stop_sec: {
      node: 'ns=2;s=PLC_FSB.Pillow.bypass_stop_sec',
      decimal: 1,
      column: 'bypass_stop_sec',
    },
    bypass_to_start_sec: {
      node: 'ns=2;s=PLC_FSB.Pillow.bypass_to_start_sec',
      decimal: 1,
      column: 'bypass_to_start_sec',
    },
    drawer_op_delay_sec: {
      node: 'ns=2;s=PLC_FSB.Pillow.drawer_op_delay_sec',
      decimal: 1,
      column: 'drawer_op_delay_sec',
    },
    drawer_pulse_count_sva23: {
      node: 'ns=2;s=PLC_FSB.Pillow.drawer_pulse_count_sva23',
      decimal: 1,
      column: 'drawer_pulse_count_sva23',
    },
    drawer_slow_pulse_count_sva23: {
      node: 'ns=2;s=PLC_FSB.Pillow.drawer_slow_pulse_count_sva23',
      decimal: 1,
      column: 'drawer_slow_pulse_count_sva23',
    },
    drawer_slow_sva23: {
      node: 'ns=2;s=PLC_FSB.Pillow.drawer_slow_sva23',
      decimal: 1,
      column: 'drawer_slow_sva23',
    },
    drawer_sva23: {
      node: 'ns=2;s=PLC_FSB.Pillow.drawer_sva23',
      decimal: 1,
      column: 'drawer_sva23',
    },
    product_length_err_sec: {
      node: 'ns=2;s=PLC_FSB.Pillow.product_length_err_sec',
      decimal: 1,
      column: 'product_length_err_sec',
    },
    transfer_stop_sec: {
      node: 'ns=2;s=PLC_FSB.Pillow.transfer_stop_sec',
      decimal: 1,
      column: 'transfer_stop_sec',
    },
    Counter_Outerbox: {
      node: 'ns=2;s=PLC_FSB.Packing_FX5U.Counter_Outerbox',
      decimal: 1,
      column: 'Counter_Outerbox',
    },
    Counter_FG: {
      node: 'ns=2;s=PLC_FSB.Packing_FX5U.Counter_FG',
      decimal: 1,
      column: 'Counter_FG',
    },
    Counting_jaw_pillow: {
      node: 'ns=2;s=PLC_FSB.Pillow.Counting_jaw_pillow',
      decimal: 1,
      column: 'Counting_jaw_pillow'
    },
    counting_jaw_tiap_menit: {
      node: 'ns=2;s=PLC_FSB.Pillow.counting_jaw_tiap_menit',
      decimal: 1,
      column: 'counting_jaw_tiap_menit'
    },
    HT1_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT1 Counting',
      decimal: 1,
      column: 'HT1_counting'
    },
    HT2_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT2 Counting',
      decimal: 1,
      column: 'HT2_counting'
    },
    HT3_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT3 Counting',
      decimal: 1,
      column: 'HT3_counting'
    },
    HT4_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT4 Counting',
      decimal: 1,
      column: 'HT4_counting'
    },
    HT5_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT5 Counting',
      decimal: 1,
      column: 'HT5_counting'
    },
    HT6_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT6 Counting',
      decimal: 1,
      column: 'HT6_counting'
    },
    HT7_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT7 Counting',
      decimal: 1,
      column: 'HT7_counting'
    },
    HT8_counting: {
      node: 'ns=2;s=PLC_FSB.Pillow.HT8 Counting',
      decimal: 1,
      column: 'HT8_counting'
    },
    Arus_INV1_Net: {
      node: 'ns=2;s=PLC_FSB.Cooling.Arus_INV1_Net',
      decimal: 0.01,
      column: 'Arus_INV1_Net'
    },
    Arus_INV4_belt: {
      node: 'ns=2;s=PLC_FSB.Cooling.Arus_INV4_belt',
      decimal: 0.01,
      column: 'Arus_INV4_belt'
    },   
    Arus_M11: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M11',
      decimal: 0.01,
      column: 'Arus_M11'
    },
    Arus_M121: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M121',
      decimal: 0.01,
      column: 'Arus_M121'
    },
    Arus_M122: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M122',
      decimal: 0.01,
      column: 'Arus_M122'
    },
    Arus_M123: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M123',
      decimal: 0.01,
      column: 'Arus_M123'
    },
    Arus_M124: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M124',
      decimal: 0.01,
      column: 'Arus_M124'
    },
    Arus_M125: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M125',
      decimal: 0.01,
      column: 'Arus_M125'
    },
    Arus_M126: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M126',
      decimal: 0.01,
      column: 'Arus_M126'
    },
    Arus_M127: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M127',
      decimal: 0.01,
      column: 'Arus_M127'
    },
    Arus_M128: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M128',
      decimal: 0.01,
      column: 'Arus_M128'
    },
    Arus_M129: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M129',
      decimal: 0.01,
      column: 'Arus_M129'
    },
    Arus_M14: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M14',
      decimal: 0.01,
      column: 'Arus_M14'
    },
    Arus_M21: {
      node: 'ns=2;s=PLC_FSB.Pillow.Arus_M21',
      decimal: 0.01,
      column: 'Arus_M21'
    },
    Frekuency_INV1_Net: {
      node: 'ns=2;s=PLC_FSB.Cooling.Frekuency_INV1_Net',
      decimal: 0.01,
      column: 'Frekuency_INV1_Net'
    },
    Frekuency_INV4_belt: {
      node: 'ns=2;s=PLC_FSB.Cooling.Frekuency_INV4_belt',
      decimal: 0.01,
      column: 'Frekuency_INV4_belt'
    },
    Frekuency_M11: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M11',
      decimal: 0.01,
      column: 'Frekuency_M11'
    },
    Frekuency_M121: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M121',
      decimal: 0.01,
      column: 'Frekuency_M121'
    },
    Frekuency_M122: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M122',
      decimal: 0.01,
      column: 'Frekuency_M122'
    },
    Frekuency_M123: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M123',
      decimal: 0.01,
      column: 'Frekuency_M123'
    },
    Frekuency_M124: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M124',
      decimal: 0.01,
      column: 'Frekuency_M124'
    },
    Frekuency_M125: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M125',
      decimal: 0.01,
      column: 'Frekuency_M125'
    },
    Frekuency_M126: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M126',
      decimal: 0.01,
      column: 'Frekuency_M126'
    },
    Frekuency_M127: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M127',
      decimal: 0.01,
      column: 'Frekuency_M127'
    },
    Frekuency_M128: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M128',
      decimal: 0.01,
      column: 'Frekuency_M128'
    },
    Frekuency_M129: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M129',
      decimal: 0.01,
      column: 'Frekuency_M129'
    },
    Frekuency_M14: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M14',
      decimal: 0.01,
      column: 'Frekuency_M14'
    },
    Frekuency_M21: {
      node: 'ns=2;s=PLC_FSB.Pillow.Frekuency_M21',
      decimal: 0.01,
      column: 'Frekuency_M21'
    },
    current_A: {
      node: 'ns=2;s=ModbusTCP.FSB_currentmeter_pillow.current_A',
      decimal: 1,
      column: 'current_A'
    },
    current_B: {
      node: 'ns=2;s=ModbusTCP.FSB_currentmeter_pillow.current_B',
      decimal: 1,
      column: 'current_B'
    },
    current_C: {
      node: 'ns=2;s=ModbusTCP.FSB_currentmeter_pillow.current_C',
      decimal: 1,
      column: 'current_C'
    },
    voltage_meter_ijp_MD: {
      node: 'ns=2;s=ModbusTCP.FSB_voltage meter_IJP.voltage_MD',
      decimal: 1,
      column: 'voltage_meter_ijp_MD'
    }
  },
  fsb_pillow_keyence: {
    Temp_HT1: {
      node:'ns=2;s=PLCKeyence.pillow keyence.Temp_HT1',
      decimal: 1,
      column: 'Temp_HT1'
    },
    Temp_HT2: {
      node:'ns=2;s=PLCKeyence.pillow keyence.Temp_HT2',
      decimal: 1,
      column: 'Temp_HT2'
    },
    Temp_HT3: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT3',
      decimal: 1,
      column: 'Temp_HT3',
    },
    Temp_HT4: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT4',
      decimal: 1,
      column: 'Temp_HT4',
    },
    Temp_HT5: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT5',
      decimal: 1,
      column: 'Temp_HT5',
    },
    Temp_HT6: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT6',
      decimal: 1,
      column: 'Temp_HT6',
    },
    Temp_HT7: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT7',
      decimal: 1,
      column: 'Temp_HT7',
    },
    Temp_HT8: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.Temp_HT8',
      decimal: 1,
      column: 'Temp_HT8',
    },
    seal_ng: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.seal_ng',
      decimal: 1,
      column: 'seal_ng',
    },
    ijp_ng: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.ijp_ng',
      decimal: 1,
      column: 'ijp_ng',
    },
    ijp_ok: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.ijp_ok',
      decimal: 1,
      column: 'ijp_ok',
    },
    ijp_allcnt: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.ijp_allcnt',
      decimal: 1,
      column: 'ijp_allcnt',
    },
    position_seal_ng: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.position_seal_ng',
      decimal: 1,
      column: 'position_seal_ng',
    },
    width_seal_ng: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.width_seal_ng',
      decimal: 1,
      column: 'width_seal_ng',
    },
    reject_contam_xray: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.reject_contam_xray',
      decimal: 1,
      column: 'reject_contam_xray',
    },
    reject_shape_NG_xray1: {
      node: 'ns=2;s=PLCKeyence.pillow keyence.reject_shape_NG_xray1',
      decimal: 1,
      column: 'reject_shape_NG_xray1',
    }
  },
  pre_alarm3: {
    enable_telegram: {
      node:'ns=2;s=PLC_FSB.HVAC.enable_telegram',
      decimal: 'string',
      column: 'enable_telegram'
    },    
    Status_AHU: {
      node: 'ns=2;s=PLC_FSB.HVAC.Status_AHU',
      decimal: 'string',
      column: 'Status_AHU'
    },
    temp_mixing_forming: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_mixing_forming',
      decimal: 0.01,
      column: 'temp_mixing_forming',
    } 
  },
  cttn_hvac_fsb: {
    rh_coldstorage: {
      node:'ns=2;s=PLC_FSB.HVAC.rh_coldstorage',
      decimal: 0.01,
      column: 'rh_coldstorage'
    },
    rh_rack_7: {
      node:'ns=2;s=PLC_FSB.HVAC.rh_rack_7',
      decimal: 0.01,
      column: 'rh_rack_7'
    },
    rh_rm_7: {
      node: 'ns=2;s=PLC_FSB.HVAC.rh_rm_7',
      decimal: 0.01,
      column: 'rh_rm_7',
    },
    temp_cold_storage: {
      node: 'nns=2;s=PLC_FSB.HVAC.temp_cold_storage',
      decimal: 0.01,
      column: 'temp_cold_storage',
    },
    temp_drying_room: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_drying_room',
      decimal: 0.01,
      column: 'temp_drying_room',
    },
    temp_flavor_weigh: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_flavor_weigh',
      decimal: 0.01,
      column: 'temp_flavor_weigh',
    },
    temp_granulated: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_granulated',
      decimal: 0.01,
      column: 'temp_granulated',
    },
    temp_locker: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_locker',
      decimal: 0.01,
      column: 'temp_locker',
    },
    temp_mix_powder: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_mix_powder',
      decimal: 0.01,
      column: 'temp_mix_powder',
    },
    temp_mixing_forming: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_mixing_forming',
      decimal: 0.01,
      column: 'temp_mixing_forming',
    },
    temp_oahu1: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_oahu1',
      decimal: 0.01,
      column: 'temp_oahu1',
    },
    temp_oahu2: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_oahu2',
      decimal: 0.01,
      column: 'temp_oahu2',
    },
    temp_rack_7: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_rack_7',
      decimal: 0.01,
      column: 'temp_rack_7',
    },
    temp_rack_truck: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_rack_truck',
      decimal: 0.01,
      column: 'temp_rack_truck',
    },
    temp_remian_material: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_remian_material',
      decimal: 0.01,
      column: 'temp_remian_material',
    },
    temp_rm_7: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_rm_7',
      decimal: 0.01,
      column: 'temp_rm_7',
    },
    temp_rm_storage: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_rm_storage',
      decimal: 0.01,
      column: 'temp_rm_storage',
    },
    temp_soy_flour: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_soy_flour',
      decimal: 0.01,
      column: 'temp_soy_flour',
    },
    temp_weigh_material: {
      node: 'ns=2;s=PLC_FSB.HVAC.temp_weigh_material',
      decimal: 0.01,
      column: 'temp_weigh_material',
    },
    voltage_MD: {
      node: 'ns=2;s=ModbusTCP.FSB_voltage meter_MD.voltage_MD',
      decimal: 1,
      column: 'voltage_MD'
    }
  },
  k6pm_mixing_fsb: {
    max_temp_segmen0: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen0',
      decimal: 0.1,
      column: 'max_temp_segmen0'
    },    
    max_temp_segmen1: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen1',
      decimal: 0.1,
      column: 'max_temp_segmen1'
    },
    max_temp_segmen2: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen2',
      decimal: 0.1,
      column: 'max_temp_segmen2'
    },
    max_temp_segmen3: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen3',
      decimal: 0.1,
      column: 'max_temp_segmen3'
    },
    max_temp_segmen4: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen4',
      decimal: 0.1,
      column: 'max_temp_segmen4'
    },
    max_temp_segmen5: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen5',
      decimal: 0.1,
      column: 'max_temp_segmen5'
    },
    max_temp_segmen6: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen6',
      decimal: 0.1,
      column: 'max_temp_segmen6'
    },
    max_temp_segmen7: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen7',
      decimal: 0.1,
      column: 'max_temp_segmen7'
    },
    max_temp_segmen8: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen8',
      decimal: 0.1,
      column: 'max_temp_segmen8'
    },
    max_temp_segmen9: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen9',
      decimal: 0.1,
      column: 'max_temp_segmen9'
    },
    max_temp_segmen10: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen10',
      decimal: 0.1,
      column: 'max_temp_segmen10'
    },
    max_temp_segmen11: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen11',
      decimal: 0.1,
      column: 'max_temp_segmen11'
    },
    max_temp_segmen12: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen12',
      decimal: 0.1,
      column: 'max_temp_segmen12'
    },
    max_temp_segmen13: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen13',
      decimal: 0.1,
      column: 'max_temp_segmen13'
    },
    max_temp_segmen14: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen14',
      decimal: 0.1,
      column: 'max_temp_segmen14'
    },
    max_temp_segmen15: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.max_temp_segmen15',
      decimal: 0.1,
      column: 'max_temp_segmen15'
    },
    temp_segmen0: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen0',
      decimal: 0.1,
      column: 'temp_segmen0'
    },
    temp_segmen1: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen1',
      decimal: 0.1,
      column: 'temp_segmen1'
    },
    temp_segmen2: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen2',
      decimal: 0.1,
      column: 'temp_segmen2'
    },
    temp_segmen3: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen3',
      decimal: 0.1,
      column: 'temp_segmen3'
    },
    temp_segmen4: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen4',
      decimal: 0.1,
      column: 'temp_segmen4'
    },
    temp_segmen5: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen5',
      decimal: 0.1,
      column: 'temp_segmen5'
    },
    temp_segmen6: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen6',
      decimal: 0.1,
      column: 'temp_segmen6'
    },
    temp_segmen7: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen7',
      decimal: 0.1,
      column: 'temp_segmen7'
    },
    temp_segmen8: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen8',
      decimal: 0.1,
      column: 'temp_segmen8'
    },
    temp_segmen9: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen9',
      decimal: 0.1,
      column: 'temp_segmen9'
    },
    temp_segmen10: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen10',
      decimal: 0.1,
      column: 'temp_segmen10'
    },
    temp_segmen11: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen11',
      decimal: 0.1,
      column: 'temp_segmen11'
    },
    temp_segmen12: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen12',
      decimal: 0.1,
      column: 'temp_segmen12'
    },
    temp_segmen13: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen13',
      decimal: 0.1,
      column: 'temp_segmen13'
    },
    temp_segmen14: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen14',
      decimal: 0.1,
      column: 'temp_segmen14'
    },
    temp_segmen15: {
      node:'ns=2;s=Modbuss-Energy1.k6pm_Mixing_FSB.temp_segmen15',
      decimal: 0.1,
      column: 'temp_segmen15'
    }
  },
  packing_fx5uj_motorfsb: {
    arus_CV_1: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_1',
      decimal: 0.01,
      column: 'arus_CV_1'
    },
    arus_CV_3: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_3',
      decimal: 0.01,
      column: 'arus_CV_3'
    },
    arus_CV_4: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_4',
      decimal: 0.01,
      column: 'arus_CV_4'
    },
    arus_CV_5: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_5',
      decimal: 0.01,
      column: 'arus_CV_5'
    },
    arus_CV_6: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_6',
      decimal: 0.01,
      column: 'arus_CV_6'
    },
    arus_CV_7: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_7',
      decimal: 0.01,
      column: 'arus_CV_7'
    },
    arus_CV_8: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_8',
      decimal: 0.01,
      column: 'arus_CV_8'
    },
    arus_CV_9: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_9',
      decimal: 0.01,
      column: 'arus_CV_9'
    },
    arus_CV_10: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_10',
      decimal: 0.01,
      column: 'arus_CV_10'
    },
    arus_CV_11: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_11',
      decimal: 0.01,
      column: 'arus_CV_11'
    },
    arus_CV_12: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_12',
      decimal: 0.01,
      column: 'arus_CV_12'
    },
    arus_CV_13: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_13',
      decimal: 0.01,
      column: 'arus_CV_13'
    },
    arus_CV_14: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_14',
      decimal: 0.01,
      column: 'arus_CV_14'
    },
    arus_CV_15: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_15',
      decimal: 0.01,
      column: 'arus_CV_15'
    },
    arus_CV_16: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.arus_CV_16',
      decimal: 0.01,
      column: 'arus_CV_16'
    },
    frequency_CV_1: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_1',
      decimal: 0.01,
      column: 'frequency_CV_1'
    },
    frequency_CV_3: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_3',
      decimal: 0.01,
      column: 'frequency_CV_3'
    },
    frequency_CV_4: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_4',
      decimal: 0.01,
      column: 'frequency_CV_4'
    },
    frequency_CV_5: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_5',
      decimal: 0.01,
      column: 'frequency_CV_5'
    },
    frequency_CV_6: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_6',
      decimal: 0.01,
      column: 'frequency_CV_6'
    },
    frequency_CV_7: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_7',
      decimal: 0.01,
      column: 'frequency_CV_7'
    },
    frequency_CV_8: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_8',
      decimal: 0.01,
      column: 'frequency_CV_8'
    },
    frequency_CV_9: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_9',
      decimal: 0.01,
      column: 'frequency_CV_9'
    },
    frequency_CV_10: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_10',
      decimal: 0.01,
      column: 'frequency_CV_10'
    },
    frequency_CV_11: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_11',
      decimal: 0.01,
      column: 'frequency_CV_11'
    },
    frequency_CV_12: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_12',
      decimal: 0.01,
      column: 'frequency_CV_12'
    },
    frequency_CV_13: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_13',
      decimal: 0.01,
      column: 'frequency_CV_13'
    },
    frequency_CV_14: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_14',
      decimal: 0.01,
      column: 'frequency_CV_14'
    },
    frequency_CV_15: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_15',
      decimal: 0.01,
      column: 'frequency_CV_15'
    },
    frequency_CV_16: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.frequency_CV_16',
      decimal: 0.01,
      column: 'frequency_CV_16'
    },
    Kamikomi_1: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Kamikomi_1',
      decimal: 1,
      column: 'Kamikomi_1'
    },
    Kamikomi_2: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Kamikomi_2',
      decimal: 1,
      column: 'Kamikomi_2'
    },
    Kamikomi_3: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Kamikomi_3',
      decimal: 1,
      column: 'Kamikomi_3'
    },
    Kamikomi_4: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Kamikomi_4',
      decimal: 1,
      column: 'Kamikomi_4'
    },
    Wringkle_1: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Wringkle_1',
      decimal: 1,
      column: 'Wringkle_1'
    },
    Wringkle_2: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Wringkle_2',
      decimal: 1,
      column: 'Wringkle_2'
    },
    Wringkle_3: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Wringkle_3',
      decimal: 1,
      column: 'Wringkle_3'
    },
    Wringkle_4: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Wringkle_4',
      decimal: 1,
      column: 'Wringkle_4'
    },
    Total_kamikomi: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Total_kamikomi',
      decimal: 1,
      column: 'Total_kamikomi'
    },
    Total_wringkle: {
      node:'ns=2;s=PLC_FSB.Packing_FX5UJ_motor.Total_wringkle',
      decimal: 1,
      column: 'Total_wringkle'
    } 
  }  
};