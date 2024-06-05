"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("comments", [
            {
                userId: 13,
                postId: 9,
                content:
                    "thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 13,
                postId: 1,
                content:
                    "thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 2,
                postId: 1,
                content:
                    "thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 13,
                postId: 1,
                content: "xinh thế",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 3,
                postId: 1,
                content:
                    "thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 9,
                postId: 1,
                content: "ổn 😁",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 5,
                postId: 1,
                content: "thích lắm hả : ) 😁",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 6,
                postId: 1,
                content: "nhìn oke 😁",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 7,
                postId: 1,
                content: "idol à",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 4,
                postId: 1,
                content: "ổn",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 8,
                postId: 1,
                content: "oke",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 10,
                postId: 1,
                content: "xịn",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 11,
                postId: 1,
                content: "duyệt 😄",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 12,
                postId: 1,
                content:
                    "thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 12,
                postId: 9,
                content: "So good!",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 1,
                postId: 1,
                content: "So good!",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 3,
                postId: 1,
                content: "Beautiful!",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 10,
                postId: 6,
                content: "Hmmmm",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 13,
                postId: 13,
                content: "Nếu phải chọn một cá tính theo suốt cuộc đời, bạn hãy chọn óc khôi hài.",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 13,
                postId: 10,
                content: `Hoa không thể dang tay ôm lấy bạn, vì thế nó chọn cách bung nở nụ xinh. Cây xanh không thể cùng bạn gỡ những rối bời, vì thế nó mở rộng tán cây để che mát ngày nắng đổ. Ghế đá không thể nói với bạn câu an ủi, vì thế nó luôn đứng chờ bạn tìm đến nghỉ chân.
                Bằng một cách nào đó, thế giới này vẫn luôn âm thầm yêu bạn. Dù đôi khi bạn lãng quên việc yêu mình.
                —
                🎨 Hiên nhà chắn hết mưa giông - Cuốn sách tô màu chữa lành trái tim bạn`,
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 13,
                postId: 1,
                content: `Hoa không thể dang tay ôm lấy bạn, vì thế nó chọn cách bung nở nụ xinh. Cây xanh không thể cùng bạn gỡ những rối bời, vì thế nó mở rộng tán cây để che mát ngày nắng đổ. Ghế đá không thể nói với bạn câu an ủi, vì thế nó luôn đứng chờ bạn tìm đến nghỉ chân.
                Bằng một cách nào đó, thế giới này vẫn luôn âm thầm yêu bạn. Dù đôi khi bạn lãng quên việc yêu mình.
                —
                🎨 Hiên nhà chắn hết mưa giông - Cuốn sách tô màu chữa lành trái tim bạn`,
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 12,
                postId: 9,
                content: "Oke i think so",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 10,
                postId: 10,
                content: "Hmmmm",
                parentComment: 1,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 9,
                postId: 9,
                content: "Oke!",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 1,
                postId: 9,
                content: "Look so good!",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 2,
                postId: 9,
                content: "Đi đâu thế?",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 3,
                postId: 9,
                content: "Đi đâu thế?",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 4,
                postId: 9,
                content: "What happen right here?",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 5,
                postId: 9,
                content: "kkkk",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 6,
                postId: 9,
                content: "Toẹt",
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("comments", null, {});
    },
};
