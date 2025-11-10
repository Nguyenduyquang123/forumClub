// viLocale.js (tạo 1 file riêng để quản lý locale)
import { register } from 'timeago.js';

const viLocale = (number, index) => [
  ['vừa xong', 'vừa xong'],

  ['1 phút trước', 'sau 1 phút'],
  ['%s phút trước', 'sau %s phút'],
  ['1 giờ trước', 'sau 1 giờ'],
  ['%s giờ trước', 'sau %s giờ'],
  ['1 ngày trước', 'sau 1 ngày'],
  ['%s ngày trước', 'sau %s ngày'],
  ['1 tuần trước', 'sau 1 tuần'],
  ['%s tuần trước', 'sau %s tuần'],
  ['1 tháng trước', 'sau %s tháng'],
  ['%s tháng trước', 'sau %s tháng'],
  ['1 năm trước', 'sau %s năm'],
  ['%s năm trước', 'sau %s năm']
][index];

register('vi', viLocale); // đăng ký locale 'vi'
