# -*- coding: utf-8 -*-
import logging

from odoo import _, api, fields, models
from odoo.http import request

_logger = logging.getLogger(__name__)


class HrAttendance(models.Model):
    _inherit = "hr.attendance"

    check_in_ip = fields.Char(string="Check In IP Address",
        readonly=True)
    check_out_ip = fields.Char(string="Check Out IP Address",
        readonly=True)

    @api.constrains("check_in")
    def _set_check_in_ip(self):
        for attendance in self:
            if attendance.check_in:
                try:
                    attendance.check_in_ip = request.httprequest.remote_addr
                except Exception as e:
                    _logger.error(f"Error on setting checkin IP: {str(e)}")
                    _logger.error(f"Setting checkin IP to N/A...")
                    attendance.check_in_ip = "N/A"

    @api.constrains("check_out")
    def _set_check_out_ip(self):
        for attendance in self:
            if attendance.check_out:
                try:
                    attendance.check_out_ip = request.httprequest.remote_addr
                except Exception as e:
                    _logger.error(f"Error on setting checkout IP: {str(e)}")
                    _logger.error(f"Setting checkout IP to N/A...")
                    attendance.check_out_ip = "N/A"
