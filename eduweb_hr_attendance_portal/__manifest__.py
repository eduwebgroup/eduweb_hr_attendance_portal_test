# -*- coding: utf-8 -*-
{
    'name': 'Eduweb Hr Attendance Portal',
    'version': '15.0.1.8',
    'summary': 'Eduweb Hr Attendance Portal',
    'description': 'Since Odoo charges subscriptions based on the number of Internal Users, Eduweb has developed an innovative Attendance Portal. This module empowers Portal Users to record and monitor their attendance just like Internal Users, without incurring additional costs. Experience seamless attendance tracking with our cost-effective solution.',
    'category': 'Human Resources',
    'author': 'Eduweb Group',
    'maintainer': 'Eduweb Group',
    'price': '235.0',
    'currency': 'USD',
    'website': 'https://www.eduwebgroup.com',
    'license': 'OPL-1',
    'depends': [
        'web',
        'portal',
        'hr_attendance',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/assets.xml',
        'security/hr_attendance_security.xml',
        'views/hr_attendance_portal_templates.xml',
        'views/hr_attendance_views.xml'
    ],
    'images': [], 
    'installable': True,
    'application': True,
    'auto_install': False,

}
