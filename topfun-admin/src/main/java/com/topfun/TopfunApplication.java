package com.topfun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 *
 * @author topfun
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class TopfunApplication {
    public static void main(String[] args) {
        System.setProperty("spring.devtools.restart.enabled", "true");
        SpringApplication.run(TopfunApplication.class, args);
        System.out.println("程序启动成功");
    }
}
