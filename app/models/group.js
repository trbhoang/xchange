const USERGROUP_ADMIN = "admin",
    USERGROUP_DAI_LY_CAP1 = "dai_ly_cap1",
    USERGROUP_DAI_LY_CAP2 = "dai_ly_cap2",
    Group = {
        [USERGROUP_ADMIN]: "Administrator",
        [USERGROUP_DAI_LY_CAP1]: "Đại lý cấp 1",
        [USERGROUP_DAI_LY_CAP2]: "Đại lý cấp 2"
    },
    GroupList = [[USERGROUP_DAI_LY_CAP1, Group[USERGROUP_DAI_LY_CAP1]], [USERGROUP_DAI_LY_CAP2, Group[USERGROUP_DAI_LY_CAP2]]];

module.exports = {
    USERGROUP_ADMIN,
    USERGROUP_DAI_LY_CAP1,
    USERGROUP_DAI_LY_CAP2,
    Group,
    GroupList
};
