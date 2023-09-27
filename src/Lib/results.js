export function calculate_points(time_spent, max_time, max_points) {
    const seconds_per_point = max_time / max_points;
    const bonus_time = Math.max(max_time - time_spent, 0);
    return Math.ceil(bonus_time / seconds_per_point);
  }
  