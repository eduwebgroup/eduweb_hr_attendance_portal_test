odoo.define("eduweb_hr_attendance_portal.CheckButton", require => {
    "use strict";

    const Widget = require('web.Widget')
    const core = require('web.core');
    const session = require('web.session')
    const rpc = require('web.rpc')
    const _t = core._t;
    const CHECK_IN_TEXT = _t("Check In")
    const CHECK_OUT_TEXT = _t("Check Out")


    const CheckButton = Widget.extend({
        xmlDependencies: ['/eduweb_hr_attendance_portal/static/src/xml/views.xml'],
        template: 'hr_attendance_portal_check',

        events: {
            'click button': 'on_click_check_button',
        },
        init() {
            this._super(...arguments);
            this.updating_attendance = false
        },
        async willStart() {
            await this._super(...arguments);
            const res = await rpc.query({
                model: 'hr.employee',
                method: 'search_read',
                kwargs: {
                    'domain': [
                        ['user_id', '=', session.user_id]
                    ],
                    'fields': ['attendance_state', 'name', 'hours_today']
                },
            })

            this.employee = res.length && res[0];
            if (res.length) {}
            this.commandName = this.employee.attendance_state === 'checked_out' ? CHECK_IN_TEXT : CHECK_OUT_TEXT;

        },
        async on_click_check_button(){
            const $button = this.$el.find("button");
            try  {
                if(!this.updating_attendance){
                    this.updating_attendance = true;
                    // this.$el.find('#attendance_error_message').text("");

                    $button.prop('disabled', this.updating_attendance);
                    $button.find('.spinner-border').toggle(this.updating_attendance);
                    await this.update_attendance();
                    this.updating_attendance = false;

                }
            } catch (e){
                this.updating_attendance = false;
                this.show_error_message(e);
            }
        },
        show_error_message(message){
            const $button = this.$el.find('button');
            this.$el.find('#attendance_error_message').text(message);
            $button.prop('disabled', this.updating_attendance);
            $button.find('.spinner-border').toggle(this.updating_attendance)

        },

        async update_attendance() {
            const result = await rpc.query({
                model: 'hr.employee',
                method: 'attendance_manual',
                args: [
                    [this.employee.id], 'hr_attendance.hr_attendandance_action_my_attendance'
                ],
                context: session.user_context,

            });
            if (result.warning) {
                this.updating_attendance = false;
                this.show_error_message(result.warning);
            } else{
                window.location.reload()
            }

        },


    });
    const attendanceCheckButtonEl = document.getElementById('attendance_check_button');
    const checkButton = new CheckButton();
    checkButton.appendTo(attendanceCheckButtonEl);

    return CheckButton
});