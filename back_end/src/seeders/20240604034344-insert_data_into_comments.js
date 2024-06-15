"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const comments = [];
        const numberOfComments = 900;
        const userIds = Array.from({ length: 30 }, (_, i) => i + 1);
        const postIds = Array.from({ length: 300 }, (_, i) => i + 1);

        const contentTemplates = [
            "Thật ra người muốn hiểu thì không cần bạn nói ra họ vẫn sẽ hỏi, còn người đã không hiểu thì bạn có dùng hết lòng để giải thích thì họ vẫn sẽ mặc định và đánh giá bạn theo cách của họ muốn mà thôi. Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng",
            `Hoa không thể dang tay ôm lấy bạn, vì thế nó chọn cách bung nở nụ xinh. Cây xanh không thể cùng bạn gỡ những rối bời, vì thế nó mở rộng tán cây để che mát ngày nắng đổ. Ghế đá không thể nói với bạn câu an ủi, vì thế nó luôn đứng chờ bạn tìm đến nghỉ chân.
                Bằng một cách nào đó, thế giới này vẫn luôn âm thầm yêu bạn. Dù đôi khi bạn lãng quên việc yêu mình.
                —
                🎨 Hiên nhà chắn hết mưa giông - Cuốn sách tô màu chữa lành trái tim bạn`,
            "Đôi khi im lặng là cách tốt nhất để bạn giữ cho bản thân chút năng lượng cuối cùng.",
            "Nếu phải chọn một cá tính theo suốt cuộc đời, bạn hãy chọn óc khôi hài.",
            "Hoa không thể dang tay ôm lấy bạn, vì thế nó chọn cách bung nở nụ xinh...",
            "Ghế đá không thể nói với bạn câu an ủi, vì thế nó luôn đứng chờ bạn tìm đến nghỉ chân.",
            "Bằng một cách nào đó, thế giới này vẫn luôn âm thầm yêu bạn. Dù đôi khi bạn lãng quên việc yêu mình.",
            "Sự thật là mọi người chỉ nghe những gì họ muốn nghe.",
            "Cuộc sống không phải lúc nào cũng dễ dàng, nhưng hãy luôn mỉm cười.",
            "Đôi khi chúng ta chỉ cần một cái ôm để biết rằng mọi thứ sẽ ổn.",
            "Cuộc sống là một hành trình, không phải là đích đến.",
            "Thời gian sẽ chữa lành mọi vết thương.",
            "Hãy luôn tin tưởng vào bản thân mình.",
            "Người ta chỉ thật sự thất bại khi từ bỏ mọi cố gắng.",
            "Thành công không đến từ những gì bạn làm không đều, mà từ những gì bạn làm hàng ngày.",
            "Hạnh phúc không phải là điều có sẵn. Nó đến từ hành động của chính bạn.",
            "Hãy sống như thể bạn sẽ chết vào ngày mai. Hãy học như thể bạn sẽ sống mãi mãi.",
            "Mỗi ngày là một cơ hội để thay đổi cuộc sống.",
            "Hãy tin rằng bạn có thể và bạn đã đi được nửa đường.",
            "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc mới là chìa khóa của thành công.",
            "Đừng bao giờ từ bỏ những gì bạn thực sự muốn làm. Người có ước mơ lớn là người mạnh mẽ.",
            "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.",
            "Hãy là sự thay đổi mà bạn muốn thấy trong thế giới này.",
            "Bạn là người duy nhất kiểm soát suy nghĩ của bạn.",
            "Hãy sống cho hôm nay và hy vọng cho ngày mai.",
            "Mỗi khó khăn là một cơ hội để phát triển.",
            "Điều quan trọng nhất là không phải bạn sống bao lâu, mà là bạn đã sống như thế nào.",
            "Thành công lớn nhất là đứng dậy sau mỗi lần thất bại.",
            "Hãy nhớ rằng không có gì là vĩnh cửu, kể cả những điều tồi tệ nhất.",
            "Cuộc sống không phải lúc nào cũng dễ dàng, nhưng hãy luôn mỉm cười.",
            "Bạn không thể kiểm soát gió, nhưng bạn có thể điều chỉnh cánh buồm.",
            "Những điều tốt đẹp sẽ đến với những người biết chờ đợi.",
            "Hãy để mọi thứ diễn ra tự nhiên.",
            "Đôi khi bạn phải mất mọi thứ để tìm thấy chính mình.",
            "Điều quan trọng không phải là bạn sống bao lâu, mà là bạn sống như thế nào.",
            "Hãy luôn giữ cho mình một trái tim rộng mở.",
            "Mỗi ngày là một cơ hội để thay đổi cuộc sống.",
            "Hãy sống như thể bạn sẽ chết vào ngày mai.",
            "Đừng bao giờ từ bỏ những gì bạn thực sự muốn làm.",
            "Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó.",
            "Hãy tin rằng bạn có thể và bạn đã đi được nửa đường.",
            "So good!",
            "Beautiful!",
            "Hmmmm",
            "Oke i think so",
            "Look so good!",
            "Đi đâu thế?",
            "What happen right here?",
            "kkkk",
            "Toẹt",
            "Xinh thế!",
            "Ổn 😁",
            "Thích lắm hả : ) 😁",
            "Nhìn oke 😁",
            "Idol à",
            "Duyệt 😄",
            "Oke!",
            "Ổn",
            "Xịn",
        ];

        for (let i = 0; i < numberOfComments; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const postId = postIds[Math.floor(Math.random() * postIds.length)];
            const content = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
            const timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

            comments.push({
                userId,
                postId,
                content,
                parentComment: null,
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }

        await queryInterface.bulkInsert("comments", comments);
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
