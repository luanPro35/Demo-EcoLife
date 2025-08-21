package com.ecolife.service;

import com.ecolife.entity.Order;
import com.ecolife.entity.OrderItem;
import com.ecolife.entity.Product;
import com.ecolife.entity.User;
import com.ecolife.repository.OrderRepository;
import com.ecolife.repository.ProductRepository;
import com.ecolife.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order createOrder(Long userId, List<OrderItem> orderItems) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        double totalAmount = 0.0;
        for (OrderItem item : orderItems) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id " + item.getProduct().getId()));

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            item.setOrder(order);
            item.setProduct(product);
            item.setPrice(product.getPrice()); // Set price from product to ensure consistency
            totalAmount += item.getPrice() * item.getQuantity();

            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product); // Update product stock
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        return user.getOrders(); // Assuming User entity has a @OneToMany relationship with Order
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
